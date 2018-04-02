package lt.riw.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lt.riw.security.jwt.model.JwtUser;
import lt.riw.user.ApplicationUser;
import lt.riw.user.ApplicationUserVerification;

import static lt.riw.security.jwt.JwtSecurityConstants.SECRET;

import java.util.Date;

import static lt.riw.security.jwt.JwtSecurityConstants.EXPIRATION_TIME;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtGenerator {

	@Autowired
	private ApplicationUserVerification v;
	
	public String generate(JwtUser jwtUser) {

	String response = "Cannot generate token.";
		// Grabbing RequestBody JSON from TokenController
		// Creating a new claim and them building a JWT
		Claims claims = Jwts.claims().setSubject(jwtUser.getUserName());
		claims.put("role", jwtUser.getRole());
		claims.put("password", jwtUser.getPassword());
		
		// Building the JWT token with HS512 and custom secret word

		// Result is 0 if user credentials are incorrect
		ApplicationUser au = v.verifyUser(claims.getSubject(), (String) claims.get("password"));

		// If jwtUser is null RunTimeException is thrown.
		if (au.isResult() == false) {
			return response;
		} else if (au.isResult() == true) {
			return au.getRole() + " " + Jwts.builder()
					.setClaims(claims)
					.signWith(SignatureAlgorithm.HS512, SECRET)
					.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
					.compact();
		}
		return response;
	}
}
