package lt.riw.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import lt.riw.service.ReturnVehicleId;
import lt.riw.vehicle.Vehicle;
import lt.riw.vehicle.VehicleForm;
import lt.riw.vehicle.VehicleMark;
import lt.riw.vehicle.VehicleModel;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.persistence.NoResultException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class RestDataController {
	// Next implement JWT to secure API's
	// Secure users with JWT perhaps?
	// Kazkada pataisyt setResultTransformerius nes deprecated
	// Manage Vehicles + Clients pataisyt
	// Vehicle comment fielda padaryt kad nerodytu viso
	// Padaryt edite kad reiktu pasirinkt o ne editint ta fielda
	// Padaryt angulare kad url visu vehicle nuorodu butu kaip konstantos
	
	@Autowired
	private SessionFactory factory;

	@Transactional
	@SuppressWarnings("unchecked")
	@RequestMapping("/api/showall")
	public List<Vehicle> showAll() {
		// Building session
		Session session = factory.openSession();
		// Begin session
		List<Vehicle> v = session
				.createQuery(
						"SELECT v.id as id, v.hexFile as hexFile , v.vehicleYear as vehicleYear, v.dateRepaired AS dateRepaired,v.vehicleChangesComment as vehicleChangesComment,"
								+ " v.cubage AS cubage, v.gearboxType as gearboxType, md.modelName AS modelName, mk.markName AS markName"
								+ " FROM Vehicle v" + " join  VehicleModel md ON md.id = v.modelId "
								+ "join  VehicleMark mk ON mk.id = v.markId")
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).getResultList();
		session.close();
		return v;
	}

	@Transactional
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/api/showall/model")
	public List<Vehicle> showAllModels() {
		Session session = factory.openSession();
		session.beginTransaction();
		List<Vehicle> v = session
				.createQuery(
						"SELECT vmd.id as id, vmd.modelName as modelName, vmd.modelMarkId as mark_id FROM VehicleModel vmd")
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).getResultList();
		session.close();
		return v;
	}

	@Transactional
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/api/showall/mark")
	public List<Vehicle> showAllMarks() {
		Session session = factory.openSession();
		session.beginTransaction();
		List<Vehicle> v = session.createQuery("SELECT vmk.markName as markName, vmk.id as id FROM VehicleMark vmk")
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).getResultList();
		session.close();
		return v;
	}

	@Transactional
	@RequestMapping(value = "/api/showone", method = RequestMethod.GET)
	public String showOne(@RequestParam(value = "id", required = true) int id) {
		Session session = factory.openSession();
		session.beginTransaction();
		Object v = session
				.createQuery(
						"SELECT v.id as id, v.hexFile as hexFile ,v.vehicleYear as vehicleYear, Date_Format(v.dateRepaired, '%Y-%m-%d') AS dateRepaired"
								+ ",v.vehicleChangesComment as vehicleChangesComment,"
								+ " v.cubage AS cubage, v.gearboxType as gearboxType, md.modelName AS modelName, mk.markName AS markName"
								+ " FROM Vehicle v" + " join  VehicleModel md ON md.id = v.modelId "
								+ "join  VehicleMark mk ON mk.id = v.markId WHERE v.id =" + id)
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).getSingleResult();
		session.getTransaction().commit();
		session.close();
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String oneVehicle = gson.toJson(v);
		return oneVehicle;
	}

}