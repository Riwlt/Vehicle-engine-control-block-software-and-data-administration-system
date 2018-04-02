package lt.riw.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lt.riw.security.PasswordManagement;

@Service
public class ApplicationUserVerification {

	@Autowired
	private ApplicationUserRepository userRepo;
	
	@Autowired
	private PasswordManagement pm;

	public ApplicationUser verifyUser(String username, String password) {
		ApplicationUser au = new ApplicationUser();
		au.setResult(false);
		List<ApplicationUser> appUser = userRepo.findByUsername(username);
		// If username has not been found
		if (appUser.size() == 0) {
			au.setResult(false);
			// If username has been found
		} else if (appUser.size() >= 1) {
			// Verifying password
			if (pm.verifyHashedPassword(password, appUser.get(0).getPassword()) == true) {
				au.setResult(true);
				au.setUsername(username);
				au.setRole(appUser.get(0).getRole());
			}

		}
	
		return au;
	}

}
