package lt.riw.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Add encryption/decryption
// Something else I forgot

@Service
public class ApplicationUserVerification {

	@Autowired
	ApplicationUserRepository userRepo;

	public int verifyUser(String username, String password) {
		int result = 0;

		List<ApplicationUser> appUser = userRepo.findByUsername(username);

		if (appUser.size() == 0) {
			result = 0;
		} else if (appUser.size() >= 1) {

			if (appUser.get(0).getUsername().trim().equals(username) && appUser.get(0).getPassword().equals(password)) {
				result = 1;
			}

		}

		return result;
	}

}
