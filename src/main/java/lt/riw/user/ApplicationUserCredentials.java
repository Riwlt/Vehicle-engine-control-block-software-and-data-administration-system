package lt.riw.user;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import lt.riw.security.PasswordManagement;

public class ApplicationUserCredentials {

	@Autowired
	private SessionFactory factory;
	
	@Autowired
	private PasswordManagement pm;

	
}
