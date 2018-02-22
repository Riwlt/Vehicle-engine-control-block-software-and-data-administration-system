package lt.riw.controller;

import java.io.IOException;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.Gson;

import lt.riw.service.ReturnVehicleId;
import lt.riw.vehicle.Vehicle;
import lt.riw.vehicle.VehicleForm;

@RestController
public class UploadController {

	@Autowired
	private SessionFactory factory;
	
	@Autowired
	private ReturnVehicleId rv;
	
	@RequestMapping(value = "/api/upload", method = RequestMethod.POST)
	public void upload(HttpServletRequest request, @RequestParam("vehicle") String jsonString) throws IOException {
		// Creating vehicle object from Json string
		Gson gson = new Gson();
		VehicleForm vf = gson.fromJson(jsonString, VehicleForm.class);
		Vehicle v = gson.fromJson(jsonString, Vehicle.class);
		// Request File
		MultipartHttpServletRequest mRequest;
		mRequest = (MultipartHttpServletRequest) request;
		Iterator<String> itr = mRequest.getFileNames();
		while (itr.hasNext()) {
			// New MultipartFile and making it a byte array to upload to
			// database as a blob
			MultipartFile hexFile = mRequest.getFile(itr.next());
			byte[] hexFileBytes = hexFile.getBytes();
			v.setHexFile(hexFileBytes);
		}
		// Session
		Session session = factory.openSession();
		session.beginTransaction();

		v.setModelId(rv.returnVehicleId("model", vf.getModelName()));
		v.setMarkId(rv.returnVehicleId("mark", vf.getMarkName()));

		session.save(v);
		session.getTransaction().commit();
		session.close();

	}
	
}
