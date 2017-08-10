package lt.riw.vehicle;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class VehicleForm {

	@NotNull
	@Size (min=2, max = 30)
	private String modelName;
	
	@NotNull
	@Min(1)
	@Max(400000)
	private long mileage;

	@NotNull
	@Size (min=2 , max=20)
	private String fuelType;

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public long getMileage() {
		return mileage;
	}

	public void setMileage(long mileage) {
		this.mileage = mileage;
	}

	public String getFuelType() {
		return fuelType;
	}

	public void setFuelType(String fuelType) {
		this.fuelType = fuelType;
	}

	@Override
	public String toString() {
		return "VehicleForm [modelName=" + modelName + ", mileage=" + mileage + ", fuelType=" + fuelType + "]";
	}
	
	
}
