package lt.riw.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

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
import org.hibernate.Query;
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

	// Configuration XML + Model class
	// Have to make it into a bean in order to be able to use it elsewhere
	private SessionFactory factory = new Configuration().configure("hibernate.cfg.xml")
			.addAnnotatedClass(Vehicle.class)
			.buildSessionFactory();

	@RequestMapping(value = "/add/mark")
	public void addNewMark(@RequestParam("mark") String markName){
		System.out.println(markName);
		
	}
	
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
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
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		v.setModelId(returnVehicleId("model", vf.getModelName()));
		v.setMarkId(returnVehicleId("mark", vf.getMarkName()));
		
		session.save(v);
		session.getTransaction().commit();
		session.close();

	}

	@Transactional
	public int returnVehicleId(String type, String value) {
		// Returns converted vehicle id by type (model or mark)
		// If type is incorrect 0 is returned.
		int id = 0;
		Gson gson = new Gson();
		Session session = factory.openSession();
		session.beginTransaction();

		try {
			if (type == "model") {
				Object vehicleModelQuery = session
						.createQuery(
								"SELECT vmd.id AS modelId FROM VehicleModel vmd WHERE vmd.modelName = '" + value + "'")
						.getSingleResult();

				id = Integer.parseInt(gson.toJson(vehicleModelQuery));

			} else if (type == "mark") {
				Object vehicleMarkQuery = session
						.createQuery(
								"SELECT  vmk.id AS markId FROM VehicleMark vmk WHERE vmk.markName = '" + value + "'")
						.getSingleResult();

				id = Integer.parseInt(gson.toJson(vehicleMarkQuery));
			}

		} catch (NoResultException e) {
			System.out.println("Incorrect query data sent. Some value is null or incorrect.");
		} finally {
			session.close();
		}

		return id;
	}

	@Transactional
	@SuppressWarnings("unchecked")
	@RequestMapping("/showall")
	public List<Vehicle> showAll() {
		// Building session
		Session session = factory.getCurrentSession();
		// Begin session
		session.beginTransaction();
		List<Vehicle> v = session
				.createQuery(
						"SELECT v.id as id, v.hexFile as hexFile , v.vehicleYear as vehicleYear, v.dateRepaired AS dateRepaired,v.vehicleChangesComment as vehicleChangesComment,"
								+ " v.cubage AS cubage, v.gearboxType as gearboxType, md.modelName AS modelName, mk.markName AS markName"
								+ " FROM Vehicle v" + " join  VehicleModel md ON md.id = v.modelId "
								+ "join  VehicleMark mk ON mk.id = v.markId")
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).getResultList();
		session.getTransaction().commit();
		session.close();
		return v;
	}

	@Transactional
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/showall/model")
	public List<Vehicle> showAllModels() {
		Session session = factory.getCurrentSession();
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
	@RequestMapping(value = "/showall/mark")
	public List<Vehicle> showAllMarks() {
		Session session = factory.getCurrentSession();
		session.beginTransaction();
		List<Vehicle> v = session.createQuery("SELECT vmk.markName as markName, vmk.id as id FROM VehicleMark vmk")
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).getResultList();
		session.close();
		return v;
	}

	@Transactional
	@RequestMapping(value = "/edit/vehicle", method = RequestMethod.POST)
	public void editVehicle(@RequestParam("vehicle") String jsonString, @RequestParam("id") long id) {
		Session session = factory.getCurrentSession();
		Transaction tx = session.beginTransaction();
		// Getting and building the values from Edit form
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		// Original
		VehicleForm vf = gson.fromJson(jsonString, VehicleForm.class);
		// Going to be modified to fit the database
		Vehicle v = gson.fromJson(jsonString, Vehicle.class);
		// Converting models and marks to fit in the database (as id's)
		
		v.setModelId(returnVehicleId("model", vf.getModelName())); 
		v.setMarkId(returnVehicleId("mark", vf.getMarkName())); 
		v.setId(id);
		
		// If conversion fails it returns 0
		if (v.getModelId() == 0 || v.getMarkId() == 0){
			tx.rollback();
			session.close();
		} else {
			session.update(v);
			session.flush();
			tx.commit();
			session.close();
		}
	}

	@RequestMapping(value = "/showone", method = RequestMethod.GET)
	public String showOne(@RequestParam(value = "id", required = true) int id) {
		Session session = factory.getCurrentSession();
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