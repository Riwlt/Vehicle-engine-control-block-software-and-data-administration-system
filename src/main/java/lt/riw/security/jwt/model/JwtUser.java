package lt.riw.security.jwt.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class JwtUser {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String role;
    private String password;

    public void setUserName(String username) {
        this.username = username;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUserName() {
        return username;
    }

    public long getId() {
        return id;
    }

    public String getRole() {
        return role;
    }

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
