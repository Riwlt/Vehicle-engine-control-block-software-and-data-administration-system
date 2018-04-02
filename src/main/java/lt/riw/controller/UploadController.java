package lt.riw.controller;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.Gson;

import lt.riw.service.ReturnVehicleId;
import lt.riw.vehicle.Vehicle;
import lt.riw.vehicle.VehicleCustomer;
import lt.riw.vehicle.VehicleFile;
import lt.riw.vehicle.VehicleForm;

@RestController
public class UploadController {

	@Autowired
	private SessionFactory factory;

	@Autowired
	private ReturnVehicleId rv;

	@RequestMapping(value = "/api/upload", method = RequestMethod.POST)
	public void uploadVehicle(@RequestParam(value = "vehicle", required = true) String vehicleJson,
			@RequestParam(value = "customerData", required = true) String customerJson) throws IOException {

		// Creating vehicle object from Json string
		Gson gson = new Gson();
		VehicleForm vf = gson.fromJson(vehicleJson, VehicleForm.class);
		Vehicle v = gson.fromJson(vehicleJson, Vehicle.class);
		customerJson = customerJson.substring(0, customerJson.length() - 1);
		customerJson = customerJson.substring(1);
		VehicleCustomer vc = gson.fromJson(customerJson, VehicleCustomer.class);
		if (vf.getMarkName() == null || vf.getModelName() == null || vc.getId() == 0 || vc.getLastName() == null) {
			throw new RuntimeException("Incorrect data, vehicle will not be submitted.");
		} else {
			DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
			Date date = new Date();
			Session session = factory.openSession();
			session.beginTransaction();
			v.setDateAdded(dateFormat.format(date));
			v.setModelId(rv.returnVehicleId("model", vf.getModelName()));
			v.setMarkId(rv.returnVehicleId("mark", vf.getMarkName()));
			session.save(v);
			session.save(vc);
			session.getTransaction().commit();
			session.close();
		}

	}

	@RequestMapping(value = "/api/upload/file", method = RequestMethod.POST)
	public void uploadFile(HttpServletRequest request, @RequestParam("vehicleId") int id,
			@RequestParam("fileName") String fileName) throws IOException {
		VehicleFile vf = new VehicleFile();
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date date = new Date();
		MultipartHttpServletRequest mRequest;
		mRequest = (MultipartHttpServletRequest) request;
		Iterator<String> itr = mRequest.getFileNames();
		while (itr.hasNext()) {
			MultipartFile file = mRequest.getFile(itr.next());
			byte[] fileBytes = file.getBytes();
			vf.setVehicleId(id);
			vf.setDateAdded(dateFormat.format(date));
			vf.setFileBlob(fileBytes);
			vf.setFileName(fileName);
		}
		if (vf.getVehicleId() == 0 || vf.getDateAdded() == null || vf.getFileBlob() == null
				|| vf.getFileName() == null) {
			throw new RuntimeException("Incorrect data, file will not be uploaded.");
		} else {
			Session session = factory.openSession();
			session.beginTransaction();
			session.save(vf);
			session.getTransaction().commit();
			session.close();
		}

	}
}
