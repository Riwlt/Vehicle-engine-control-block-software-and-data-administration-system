package lt.riw.users;

import java.security.Principal;

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
		 
		 public void configure(HttpSecurity http) throws Exception{
			 http
	          //Request Authorization
	          .authorizeRequests()
	            .antMatchers("/login", "/showall", "/upload").permitAll().anyRequest()
	            .authenticated()
	            .and()
	            //Form Login
	            .formLogin()
	            .loginPage("/login")
	            .permitAll()
	            .defaultSuccessUrl("/")
	            .failureUrl("/login?error")
	            .and()
	            //Logout
	            .logout().logoutSuccessUrl("/login")
	            .and()
	            //HTTP basic authentication is supported
	            .httpBasic()
	            .and()
	            //Cross site tokenization
	        .csrf()
	            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
		 }
		 
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	    		//User Authentication and login view
		    	auth.authenticationProvider(authenticationProvider());
	            
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
