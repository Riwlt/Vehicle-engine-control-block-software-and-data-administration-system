package lt.riw.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userDetailsService")
@Transactional(readOnly = true)
public class UserLoginDetails implements UserDetailsService {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(final String userName) throws UsernameNotFoundException {
		Users user = userRepo.findByUsername(userName);
		if (user == null) {
			throw new UsernameNotFoundException("No user found with username: " + userName);
		}

		return new UserPrincipal(user);
	}

	public void changeUserPassword(final Users user, final String password){
		user.setPassword(passwordEncoder.encode(password));
		userRepo.save(user);
	} 

}
