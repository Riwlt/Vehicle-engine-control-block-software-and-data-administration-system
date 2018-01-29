package lt.riw.controller;

import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import lt.riw.service.ReturnVehicleId;
import lt.riw.vehicle.Vehicle;
import lt.riw.vehicle.VehicleForm;

@RestController
public class EditController {
	
	@Autowired
	private SessionFactory factory;
	
	@Autowired
	private ReturnVehicleId rv;
	
	
	@Transactional
	@RequestMapping(value = "/edit/vehicle", method = RequestMethod.POST)
	public void editVehicle(@RequestParam("vehicle") String jsonString, @RequestParam("id") long id) {
		Session session = factory.openSession();
		Transaction tx = session.beginTransaction();
		// Getting and building the values from Edit form
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		// Original
		VehicleForm vf = gson.fromJson(jsonString, VehicleForm.class);
		// Going to be modified to fit the database
		Vehicle v = gson.fromJson(jsonString, Vehicle.class);
		// Converting models and marks to fit in the database (as id's)

		v.setModelId(rv.returnVehicleId("model", vf.getModelName()));
		v.setMarkId(rv.returnVehicleId("mark", vf.getMarkName()));
		v.setId(id);

		// If conversion fails it returns 0
		if (v.getModelId() == 0 || v.getMarkId() == 0) {
			tx.rollback();
			session.close();
		} else {
			session.update(v);
			session.flush();
			tx.commit();
			session.close();
		}
	}
	
	@RequestMapping(value = "/test")
	public void testTest(){
		System.out.println("test");
	}
	
	
}
