package lt.riw.users;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import lt.riw.users.Users;

public class UserPrincipal implements UserDetails{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2405188305844472138L;
	private final Users users;
	
	public UserPrincipal(Users user){
		this.users = user;
	}

	@Override
	 public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

	  @Override
	    public String getUsername() {
	        return users.getUsername();
	    }

	    @Override
	    public String getPassword() {
	        return users.getPassword();
	    }

	 @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isEnabled() {
	        return true;
	    }

	    public Users getUser() {
	        return users;
	    }

}
