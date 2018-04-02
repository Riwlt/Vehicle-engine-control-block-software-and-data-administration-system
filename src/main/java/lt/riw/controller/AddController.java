package lt.riw.controller;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
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
	public void addVehicleMark(@RequestParam(value = "mark", required = true) String jsonString) {
		Gson gson = new Gson();
		VehicleMark vm = gson.fromJson(jsonString, VehicleMark.class);
		Session session = factory.openSession();
		Transaction tx = session.beginTransaction();
		session.save(vm);
		tx.commit();
		session.close();
	}

	@RequestMapping(value = "/api/add/model")
	public void addVehicleModel(@RequestParam(value = "model", required = true) String jsonString) {
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

	@RequestMapping(value = "/api/enable/vehicle")
	public void enableVehicle(@RequestParam(value = "id", required = true) int id) {
		if (id == 0) {
			throw new RuntimeException("Id is missing.");
		} else if (id > 0) {
			Session session = factory.openSession();
			Transaction tx = session.beginTransaction();
			Query query = session.createQuery("UPDATE Vehicle v SET v.disabled = 0 WHERE v.id =" + id);
			query.executeUpdate();
			tx.commit();
			session.close();
		}
	}

}
