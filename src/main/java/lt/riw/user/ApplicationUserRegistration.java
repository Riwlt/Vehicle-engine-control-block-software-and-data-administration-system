package lt.riw.user;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lt.riw.security.PasswordManagement;

@RestController
public class ApplicationUserRegistration {

	@Autowired
	private SessionFactory factory;
	private PasswordManagement manager;

	@RequestMapping(value = "/testas", method = RequestMethod.GET)
	public String encryptPassword(@RequestParam("pw") String password,
			PasswordManagement manager) {
		this.manager = manager;
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String pw = encoder.encode("password");

		Boolean response = manager.verifyHashedPassword(password, pw);
		System.out.println(response);
		return pw;
	}

	public void createNewUser() {

	}

}
