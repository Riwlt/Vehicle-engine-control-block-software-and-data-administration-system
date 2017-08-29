package lt.riw.users;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class Users implements  Serializable{

	private static final long serialVersionUID = -4014301969366401691L;

	
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private long id;
		
		@Column(name = "u", nullable = false, unique = true)
		private String username;
		
		@Column(name = "pw")
		private String password;

		@Column(name = "role")
		private String userRole;

		public Users() {
			super();
		}

		public Users(String username, String password, String userRole) {
			super();
			this.username = username;
			this.password = password;
			this.userRole = userRole;
		}

		public String getUsername() {
			return username;
		}

		public void setUserName(String userName) {
			this.username = userName;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getUserRole() {
			return userRole;
		}

		public void setUserRole(String userRole) {
			this.userRole = userRole;
		}

		@Override
		public String toString() {
			return "Users [username=" + username + ", password=" + password + ", userRole=" + userRole + "]";
		}

		
}
