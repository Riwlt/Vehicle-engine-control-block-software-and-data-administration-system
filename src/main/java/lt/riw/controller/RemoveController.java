package lt.riw.controller;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RemoveController {

	@Autowired
	private SessionFactory factory;

	@RequestMapping(value = "/api/vehicle/file/disable", method = RequestMethod.POST)
	public void disableFile(@RequestParam(value = "disableId", required = true) int id) {
		if (id == 0) {
			throw new RuntimeException("Id is missing.");
		} else if (id > 0) {
			Session session = factory.openSession();
			Transaction tx = session.beginTransaction();
			Query<?> query = session.createQuery("UPDATE VehicleFile vf SET vf.disabled = 1 WHERE vf.id =" + id);
			query.executeUpdate();
			tx.commit();
			session.close();
		}

	}

	@RequestMapping(value = "/api/remove/mark")
	public void removeMark(@RequestParam(value = "id", required = true) int id) {
		if (id == 0) {
			throw new RuntimeException("Id is missing.");
		} else if (id > 0) {
			Session session = factory.openSession();
			Transaction tx = session.beginTransaction();
			// 2 Queries are being used because Hibernate bulk DML operations
			// are not supported.
			Query<?> markQuery = session.createQuery("DELETE FROM VehicleMark vmk  WHERE vmk.id =" + id);
			Query<?> modelQuery = session.createQuery("DELETE FROM VehicleModel vmd  WHERE vmd.modelMarkId =" + id);
			modelQuery.executeUpdate();
			markQuery.executeUpdate();
			tx.commit();
			session.close();
		}
	}

	@RequestMapping(value = "/api/remove/model")
	public void removeModel(@RequestParam(value = "id", required = true) int id) {
		if (id == 0) {
			throw new RuntimeException("Id is missing.");
		} else if (id > 0) {
			Session session = factory.openSession();
			Transaction tx = session.beginTransaction();
			Query<?> query = session.createQuery("DELETE FROM VehicleModel vm WHERE vm.id =" + id);
			query.executeUpdate();
			tx.commit();
			session.close();
		}
	}

	@RequestMapping(value = "/api/remove/vehicle")
	public void removeVehicle(@RequestParam(value = "id", required = true) int id) {
		if (id == 0) {
			throw new RuntimeException("Id is missing.");
		} else if (id > 0) {
			Session session = factory.openSession();
			Transaction tx = session.beginTransaction();
			Query<?> query = session.createQuery("UPDATE Vehicle v SET v.removed = 1 WHERE v.id=" + id);
			Query<?> fileQuery = session.createQuery("DELETE FROM VehicleFile vf WHERE vehicleId =" + id);
			query.executeUpdate();
			fileQuery.executeUpdate();
			tx.commit();
			session.close();
		}
	}

	@RequestMapping(value = "/api/disable/vehicle")
	public void disableVehicle(@RequestParam(value = "id", required = true) int id) {
		if (id == 0) {
			throw new RuntimeException("Id is missing.");
		} else if (id > 0) {
			Session session = factory.openSession();
			Transaction tx = session.beginTransaction();
			Query<?> query = session.createQuery("UPDATE Vehicle v SET v.disabled = 1 WHERE v.id =" + id);
			query.executeUpdate();
			tx.commit();
			session.close();
		}
	}

}
