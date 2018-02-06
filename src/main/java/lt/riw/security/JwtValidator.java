package lt.riw.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lt.riw.security.model.JwtUser;
import lt.riw.user.ApplicationUserVerification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static lt.riw.security.JwtSecurityConstants.SECRET;

@Component
public class JwtValidator {

	@Autowired
	ApplicationUserVerification v;

	public JwtUser validate(String token) {

		// Grabbing the JWT
		JwtUser jwtUser = null;
		try {
			Claims body = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();

			// Creating a new JWT User with the JWT parsed
			// If request body is OK then User is verified.
			// Add expiration times and all that jazz from 0Auth
			jwtUser = new JwtUser();
			jwtUser.setUserName(body.getSubject());
			jwtUser.setRole((String) body.get("role"));
			jwtUser.setPassword((String) body.get("password"));

			// Result is 0 if user credentials are incorrect
			int result = v.verifyUser(body.getSubject(), (String) body.get("password"));

			// If jwtUser is null RunTimeException is thrown.
			if (result == 0) {
				jwtUser = null;
			}
		} catch (Exception e) {
			System.out.println(e);
		}

		return jwtUser;
	}
}
