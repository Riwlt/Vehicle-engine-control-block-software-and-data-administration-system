package lt.riw.vehicle;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "mobility_vehicle")
public class Vehicle implements Serializable{
	
	private static final long serialVersionUID = 6327623771768272238L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "model_name")
	private String modelName;
	
	@Column(name = "mileage")
	private long mileage;
	
	@Column(name = "fuel_type")
	private String fuelType;
	

	public Vehicle() {
	}

	public Vehicle(String modelName, long mileage, String fuelType) {
		this.modelName = modelName;
		this.mileage = mileage;
		this.fuelType = fuelType;
	}

	@Override
	public String toString() {
		return "Vehicle [modelName=" + modelName + ", mileage=" + mileage + ", fuelType=" + fuelType + "]";
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public long getMileage() {
		return mileage;
	}

	public void setMileage(int mileage) {
		this.mileage = mileage;
	}

	public String getFuelType() {
		return fuelType;
	}

	public void setFuelType(String fuelType) {
		this.fuelType = fuelType;
	}
	
	
}
