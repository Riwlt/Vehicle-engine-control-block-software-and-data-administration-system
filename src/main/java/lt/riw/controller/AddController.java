package lt.riw.controller;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import lt.riw.service.ReturnVehicleId;
import lt.riw.vehicle.VehicleForm;
import lt.riw.vehicle.VehicleMark;
import lt.riw.vehicle.VehicleModel;

@RestController
public class AddController {

	@Autowired
	private SessionFactory factory;

	@Autowired
	private ReturnVehicleId rv;

	@RequestMapping(value = "/api/add/mark")
	public void addVehicleMark(@RequestParam("mark") String jsonString) {
		Gson gson = new Gson();
		VehicleMark vm = gson.fromJson(jsonString, VehicleMark.class);
		Session session = factory.openSession();
		Transaction tx = session.beginTransaction();
		session.save(vm);
		tx.commit();
		session.close();
	}

	@RequestMapping(value = "/api/add/model")
	public void addVehicleModel(@RequestParam("model") String jsonString) {
		Gson gson = new Gson();
		VehicleForm vf = gson.fromJson(jsonString, VehicleForm.class);
		VehicleModel vm = gson.fromJson(jsonString, VehicleModel.class);
		vm.setModelMarkId(rv.returnVehicleId("mark", vf.getMarkName()));
		Session session = factory.openSession();
		Transaction tx = session.beginTransaction();
		session.save(vm);
		tx.commit();
		session.close();
	}

}
