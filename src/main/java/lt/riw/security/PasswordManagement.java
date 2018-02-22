package lt.riw.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordManagement {

	private BCryptPasswordEncoder encoder;

	public String encryptPassword(String password, BCryptPasswordEncoder encoder) {
		this.encoder = encoder;
		String encryptedPassword = encoder.encode(password);
		return encryptedPassword;
	}

	public boolean verifyHashedPassword(String password, String encodedPassword) {
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Boolean response = false;
		
		if (encoder.matches(password, encodedPassword)) {
			response = true;
		} else {
			response = false;
		}

		return response;
	}

}
