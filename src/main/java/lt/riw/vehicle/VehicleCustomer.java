package lt.riw.vehicle;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="vehicle_customer")
public class VehicleCustomer implements Serializable{


	private static final long serialVersionUID = -9144331503900219640L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "firstName")
	private String firstName;
	
	@Column(name = "lastName")
	private String lastName;
	
	@Column(name = "vehicle_id")
	private int vehicleId;
	
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@Column(name = "amount_paid")
	private long amountPaid;

	public VehicleCustomer(long id, String firstName, String lastName, int vehicleId, String phoneNumber,
			long amountPaid) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.vehicleId = vehicleId;
		this.phoneNumber = phoneNumber;
		this.amountPaid = amountPaid;
	}

	public VehicleCustomer() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public int getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public long getAmountPaid() {
		return amountPaid;
	}

	public void setAmountPaid(long amountPaid) {
		this.amountPaid = amountPaid;
	}

	@Override
	public String toString() {
		return "VehicleCustomer [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", vehicleId="
				+ vehicleId + ", phoneNumber=" + phoneNumber + ", amountPaid=" + amountPaid + "]";
	}
	
	
}
