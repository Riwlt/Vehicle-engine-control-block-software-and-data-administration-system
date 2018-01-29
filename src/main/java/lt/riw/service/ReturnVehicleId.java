package lt.riw.service;

import javax.persistence.NoResultException;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service
public class ReturnVehicleId {

	@Autowired
	private SessionFactory factory;
	
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
	
}
