package lt.riw.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lt.riw.security.model.JwtUser;

import org.springframework.stereotype.Component;

import static lt.riw.security.JwtSecurityConstants.SECRET;

@Component
public class JwtGenerator {

    public String generate(JwtUser jwtUser) {
    	
    // Grabbing RequestBody JSON from TokenController 
    // Creating a new claim and them building a JWT
    	
        Claims claims = Jwts.claims()
                .setSubject(jwtUser.getUserName());
        claims.put("role", jwtUser.getRole());
        claims.put("password", jwtUser.getPassword());
        
// System.out.println(jwtUser.getUserName() + " " + jwtUser.getRole() + " " + jwtUser.getId() + " " + jwtUser.getPassword());
        // Building the JWT token with HS512 and custom secret word
        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }
}
