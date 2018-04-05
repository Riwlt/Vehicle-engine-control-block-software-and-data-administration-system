package lt.riw.controller;

import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;

import lt.riw.vehicle.Vehicle;
import lt.riw.vehicle.VehicleFile;

import java.util.List;

import javax.persistence.NoResultException;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.NonUniqueResultException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class RestDataController {

	@Autowired
	private SessionFactory factory;

	@RequestMapping("/api/vehicle/convert")
	public String convertByteToString(@RequestParam(value = "fileBlob", required = true) byte[] bytes) {
		String result = new String(bytes);
		return result;
	}

	// Returns all data from vehicle_repo
	@Transactional
	@SuppressWarnings("unchecked")
	@RequestMapping("/api/showall")
	public List<Vehicle> showAll() {
		// Building session
		Session session = factory.openSession();
		// Begin session
		List<Vehicle> v = session
				.createQuery(
						"SELECT v.id as id , vc.firstName as firstName, vc.lastName as lastName, vc.phoneNumber as phoneNumber, vc.amountPaid as amountPaid, v.dateAdded as dateAdded, v.licensePlate as licensePlate, v.vehicleYear as vehicleYear, v.dateRepaired AS dateRepaired,v.vehicleChangesComment as vehicleChangesComment,"
								+ " v.cubage AS cubage, v.gearboxType as gearboxType, md.modelName AS modelName, mk.markName AS markName, v.disabled as disabled"
								+ " FROM Vehicle v" + " JOIN  VehicleModel md ON md.id = v.modelId "
								+ "JOIN  VehicleMark mk ON mk.id = v.markId JOIN VehicleCustomer vc on vc.vehicleId = v.id WHERE v.disabled = 0 AND v.removed = 0")
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).getResultList();
		session.close();
		return v;
	}

	@Transactional
	@SuppressWarnings("unchecked")
	@RequestMapping("/api/showall/disabled")
	public List<Vehicle> showAllDisabled() {

		// Building session
		Session session = factory.openSession();
		// Begin session
		List<Vehicle> v = session
				.createQuery(
						"SELECT v.id as id , vc.firstName as firstName, vc.lastName as lastName, vc.phoneNumber as phoneNumber, vc.amountPaid as amountPaid, v.dateAdded as dateAdded, v.licensePlate as licensePlate, v.vehicleYear as vehicleYear, v.dateRepaired AS dateRepaired,v.vehicleChangesComment as vehicleChangesComment,"
								+ " v.cubage AS cubage, v.gearboxType as gearboxType, md.modelName AS modelName, mk.markName AS markName, v.disabled as disabled"
								+ " FROM Vehicle v" + " JOIN  VehicleModel md ON md.id = v.modelId "
								+ "JOIN  VehicleMark mk ON mk.id = v.markId JOIN VehicleCustomer vc on vc.vehicleId = v.id WHERE v.removed = 0")
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).getResultList();
		session.close();
		return v;
	}

	// Returns vehicle models
	@Transactional
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/api/showall/model")
	public List<Vehicle> showAllModels() {
		Session session = factory.openSession();
		session.beginTransaction();
		List<Vehicle> v = session
				.createQuery(
						"SELECT vmd.id as id, vmd.modelName as modelName, vmd.modelMarkId as mark_id FROM VehicleModel vmd ORDER BY vmd.id ASC")
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).getResultList();
		session.close();
		return v;
	}

	// Returns vehicle marks
	@Transactional
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/api/showall/mark")
	public List<Vehicle> showAllMarks() {
		Session session = factory.openSession();
		session.beginTransaction();
		List<Vehicle> v = session
				.createQuery("SELECT vmk.markName as markName, vmk.id as id FROM VehicleMark vmk ORDER BY vmk.id ASC")
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).getResultList();
		session.close();
		return v;
	}

	// Returns vehicle data by vehicle id
	@Transactional
	@RequestMapping(value = "/api/showone/vehicle", method = RequestMethod.GET)
	public String showOne(@RequestParam(value = "id", required = true) int id) {
		String oneVehicle = null;
		try {
			Session session = factory.openSession();
			session.beginTransaction();
			Object v = session
					.createQuery(
							"SELECT v.id as id, vc.firstName as firstName, vc.lastName as lastName, vc.phoneNumber as phoneNumber, vc.amountPaid as amountPaid, v.vehicleYear as vehicleYear, Date_Format(v.dateRepaired, '%Y-%m-%d') AS dateRepaired"
									+ ",v.vehicleChangesComment as vehicleChangesComment,"
									+ " v.cubage AS cubage, v.gearboxType as gearboxType, md.modelName AS modelName, mk.markName AS markName, v.licensePlate as licensePlate, v.disabled as disabled"
									+ " FROM Vehicle v" + " JOIN  VehicleModel md ON md.id = v.modelId "
									+ "JOIN  VehicleMark mk ON mk.id = v.markId JOIN VehicleCustomer vc ON vc.vehicleId = v.id WHERE v.id ="
									+ id + "AND v.removed = 0")
					.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).getSingleResult();
			session.getTransaction().commit();
			session.close();
			Gson gson = new GsonBuilder().setPrettyPrinting().create();
			oneVehicle = gson.toJson(v);
		} catch (NonUniqueResultException e) {
			System.out.println("Duplicate results where query should be unique. id " + id);
		} catch (NoResultException ex) {
			System.out.println("No results were returned for vehicle with the id " + id);
		}
		return oneVehicle;
	}

	@RequestMapping(value = "/api/showall/length")
	public Long showAllLength() {
		Session session = factory.openSession();
		Long length = (Long) session.createQuery("SELECT COUNT(v.id) FROM Vehicle v").getSingleResult();
		session.close();
		return length.longValue();
	}

	// Returns file data that belongs to vehicle by id
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/api/showone/file")
	public List<VehicleFile> showVehicleFilesByVehicleId(@RequestParam(value = "id", required = true) int id) {
		Session session = factory.openSession();
		List<VehicleFile> v = session
				.createQuery(
						"SELECT vf.id as id, v.licensePlate as licensePlate, vf.fileName as fileName, vf.fileBlob as fileBlob, OCTET_LENGTH(vf.fileBlob) as fileSize, vf.dateAdded as dateAdded,"
								+ " vf.vehicleId as vehicleId FROM VehicleFile vf JOIN Vehicle v ON vf.vehicleId = v.id JOIN VehicleMark vm ON v.markId = vm.id WHERE vf.vehicleId = "
								+ id + " AND vf.disabled = 0 ORDER by vf.id ASC")
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).getResultList();
	//	Gson gson = new GsonBuilder().setPrettyPrinting().create();
	//	JsonArray vehicleArray = gson.toJsonTree(v).getAsJsonArray();
		
		return v;
	}

	// Returns file by file_repository id
	@RequestMapping(value = "/api/showone/download/file")
	@SuppressWarnings("unchecked")
	public List<VehicleFile> showVehicleFilesByFileId(@RequestParam(value = "id", required = true) int id) {
		Session session = factory.openSession();
		List<VehicleFile> v = session.createQuery(
				"SELECT vf.fileBlob as fileBlob, vf.fileName as fileName, OCTET_LENGTH(vf.fileBlob) as fileSize FROM VehicleFile vf WHERE vf.id = "
						+ id)
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).getResultList();
		return v;
	}
}