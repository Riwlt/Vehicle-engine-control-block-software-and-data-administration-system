package lt.riw.vehicle;

import java.sql.Date;
import java.time.Year;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.mysql.jdbc.Blob;

public class VehicleForm {

	@NotNull
	@Size (min=2, max = 100)
	private String markName;
	
	@NotNull
	@Size (min=2, max = 30)
	private String modelName;
	
	@NotNull
	@Min(1900-01-01)
	@Max(2100-01-01)
	private Year vehicleYear;

	@NotNull
	@Min(1900-01-01)
	@Max(2100-01-01)
	private Date dateRepaired;
	
	@NotNull
	@Size (min=0 , max=2500)
	private String vehicleChangesComment;
	
	@NotNull
	private Blob hexFile;

	public String getMarkName() {
		return markName;
	}

	public void setMarkName(String markName) {
		this.markName = markName;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public Year getVehicleYear() {
		return vehicleYear;
	}

	public void setVehicleYear(Year vehicleYear) {
		this.vehicleYear = vehicleYear;
	}

	public Date getDateRepaired() {
		return dateRepaired;
	}

	public void setDateRepaired(Date dateRepaired) {
		this.dateRepaired = dateRepaired;
	}

	public String getVehicleChangesComment() {
		return vehicleChangesComment;
	}

	public void setVehicleChangesComment(String vehicleChangesComment) {
		this.vehicleChangesComment = vehicleChangesComment;
	}

	public Blob getHexFile() {
		return hexFile;
	}

	public void setHexFile(Blob hexFile) {
		this.hexFile = hexFile;
	}
	
	
	
}
