package lt.riw.controller;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import lt.riw.security.PasswordManagement;
import lt.riw.user.ApplicationUser;
import lt.riw.user.ApplicationUserRepository;
import lt.riw.vehicle.Vehicle;
import lt.riw.vehicle.VehicleForm;

@RestController
public class UserDataController {

	@Autowired
	private ApplicationUserRepository userRepo;

	@Autowired
	private SessionFactory factory;
	
	@Autowired
	private PasswordManagement pm;

	@RequestMapping(value = "/api/users/data")
	public List<ApplicationUser> showUsers() {
		List<ApplicationUser> u = (List<ApplicationUser>) userRepo.findAll();
		return u;
	}
	
	@RequestMapping(value = "/api/users/new")
	public void addUser (@RequestParam(value = "value", required = true) String jsonString) {
		if (jsonString == "" || jsonString == "[]" || jsonString == null){
			throw new RuntimeException("String is incorrect or missing.");
		} else {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Gson gson = new Gson();
		ApplicationUser au = gson.fromJson(jsonString, ApplicationUser.class);
		au.setPassword(pm.encryptPassword(au.getPassword(), encoder));
		Session session = factory.openSession();
		session.beginTransaction();
		session.save(au);
		session.getTransaction().commit();
		session.close();
		}
	}

	@RequestMapping(value = "/api/users/data/update")
	public void updateUser(@RequestParam(value = "value", required = true) String jsonString) {
		Gson gson = new Gson();
		ApplicationUser au = gson.fromJson(jsonString, ApplicationUser.class);
		Session session = factory.openSession();
		session.beginTransaction();
		session.update(au);
		session.getTransaction().commit();
		session.close();
	}

	@RequestMapping(value = "/api/users/data/remove")
	public void removeUser(@RequestParam(value = "id", required = true) int id) {
		if (id == 0) {
			throw new RuntimeException("Id is missing.");
		} else if (id > 0) {
			Session session = factory.openSession();
			Transaction tx = session.beginTransaction();
			Query query = session.createQuery("DELETE FROM ApplicationUser au WHERE au.id =" + id);
			query.executeUpdate();
			tx.commit();
			session.close();
		}
		
	}

}
