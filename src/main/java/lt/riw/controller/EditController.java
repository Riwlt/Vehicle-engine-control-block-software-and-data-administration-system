package lt.riw.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

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
import lt.riw.vehicle.VehicleCustomer;
import lt.riw.vehicle.VehicleForm;
import lt.riw.vehicle.VehicleMark;
import lt.riw.vehicle.VehicleModel;

@RestController
public class EditController {

	@Autowired
	private SessionFactory factory;

	@Autowired
	private ReturnVehicleId rv;

	@Transactional
	@RequestMapping(value = "/api/edit/vehicle", method = RequestMethod.POST)
	public void editVehicle(@RequestParam("vehicle") String jsonString, @RequestParam("id") long id,
			@RequestParam("customerData") String customerJson) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date date = new Date();
		Session session = factory.openSession();
		Transaction tx = session.beginTransaction();
		// Getting and building the values from Edit form
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		// Original
		VehicleForm vf = gson.fromJson(jsonString, VehicleForm.class);
		// Going to be modified to fit the database
		Vehicle v = gson.fromJson(jsonString, Vehicle.class);
		// Converting models and marks to fit in the database (as id's)
		customerJson = customerJson.substring(0, customerJson.length() - 1);
		customerJson = customerJson.substring(1);
		VehicleCustomer vc = gson.fromJson(customerJson, VehicleCustomer.class);
		v.setModelId(rv.returnVehicleId("model", vf.getModelName()));
		v.setMarkId(rv.returnVehicleId("mark", vf.getMarkName()));
		v.setId(id);
		v.setDateAdded(dateFormat.format(date));

		// If conversion fails it returns 0
		if (v.getModelId() == 0 || v.getMarkId() == 0 || vc.getFirstName() == null || vc.getVehicleId() == 0) {
			tx.rollback();
			session.close();
			throw new RuntimeException("Incorrect data, vehicle will not be edited.");
		} else {
			session.update(v);
			session.update(vc);
			tx.commit();
			session.close();
		}
	}

	@Transactional
	@RequestMapping(value = "/api/edit/mark")
	public void editVehicleMark(@RequestParam("mark") String jsonString) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		VehicleMark vm = gson.fromJson(jsonString, VehicleMark.class);
		Session session = factory.openSession();
		Transaction tx = session.beginTransaction();

		if (vm.getId() == 0 || vm.getMarkName() == null) {
			tx.rollback();
			session.close();
		} else {
			session.update(vm);
			tx.commit();
			session.close();
		}

	}

	@Transactional
	@RequestMapping(value = "/api/edit/model")
	public void editVehicleModel(@RequestParam("model") String jsonString, @RequestParam("mark_id") int markId) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		VehicleModel vm = gson.fromJson(jsonString, VehicleModel.class);
		Session session = factory.openSession();
		Transaction tx = session.beginTransaction();
		vm.setModelMarkId(markId);
		if (vm.getId() == 0 || vm.getModelName() == null || vm.getModelMarkId() == 0) {
			tx.rollback();
			session.close();
		} else {
			session.update(vm);
			tx.commit();
			session.close();
		}
	}
}
