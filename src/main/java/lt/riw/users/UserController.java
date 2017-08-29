package lt.riw.users;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	 @RequestMapping(value = "/user")
	  public Principal user(Principal user) {
	    return user;
	  }
	 
	 @Configuration
	  @Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
	  protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {
		 
		 @Autowired 
		 private UserLoginDetails userLoginDetails;
		 
		 
	    protected void configure(HttpSecurity http, AuthenticationManagerBuilder auth) throws Exception {
	    	auth.authenticationProvider(authenticationProvider());
	    	  http
	          .httpBasic().and()
	          .authorizeRequests()
	            .antMatchers("/login").permitAll().anyRequest()
	            .authenticated().and()
	          .csrf()
	            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
	    } 
	    
	    private DaoAuthenticationProvider authenticationProvider() {
	    	final DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
	    	authProvider.setUserDetailsService(userLoginDetails);
	    	authProvider.setPasswordEncoder(encoder());
	    	return authProvider;
	    	}   
	    
	    @Bean
	    public PasswordEncoder encoder() {
	        return new BCryptPasswordEncoder(11);
	    }
	  }
}
