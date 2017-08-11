package lt.riw.customers;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "customers")
public class Customer implements Serializable{

	private static final long serialVersionUID = 1101406800839946096L;
	
	@Id
	@GeneratedValue
	private long id;
	
	@Column(name = "firstname")
	private String firstName;
	
	@Column(name = "lastname")
	private String lastName;
	
	@Column(name = "age")
	private int custAge;
	
	@Column(name = "city")
	private String custCity;

	protected Customer() {
	}

	public Customer(String firstName, String lastName, int custAge, String custCity) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.custAge = custAge;
		this.custCity = custCity;
	}

	@Override
	public String toString() {
		return "Customer [firstName=" + firstName + ", lastName=" + lastName + ", custAge=" + custAge + ", custCity="
				+ custCity + "]";
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public int getCustAge() {
		return custAge;
	}

	public void setCustAge(int custAge) {
		this.custAge = custAge;
	}

	public String getCustCity() {
		return custCity;
	}

	public void setCustCity(String custCity) {
		this.custCity = custCity;
	}
	
	
	
}
