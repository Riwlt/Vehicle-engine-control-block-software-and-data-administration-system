package lt.riw.user;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users_repository")
public class ApplicationUser implements Serializable{
	
	private static final long serialVersionUID = -8145474053859346259L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "u")
	private String username;
	@Column(name = "pw")
	private String password;
	@Column(name = "role")
	private String role;
	private boolean result;
 

	public ApplicationUser(long id, String username, String password, String role, boolean result) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.role = role;
		this.result = result;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public ApplicationUser() {
		super();
	}

	public long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "ApplicationUser [username=" + username + ", password=" + password + ", role=" + role + "]";
	}

	public boolean isResult() {
		return result;
	}

	public void setResult(boolean result) {
		this.result = result;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	
}