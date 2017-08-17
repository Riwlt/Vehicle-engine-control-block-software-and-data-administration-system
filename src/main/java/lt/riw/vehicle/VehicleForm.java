package lt.riw.vehicle;

import java.sql.Date;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;



public class VehicleForm {

	@NotNull
	@Size (min=2, max = 100)
	private String markName;
	
	@NotNull
	@Size (min=2, max = 30)
	private String modelName;
	
	@NotNull
	@Min(1900)
	@Max(2100)
	private int vehicleYear;

	@NotNull
	private Date dateRepaired;
	
	@NotNull
	@Size (min=0 , max=2500)
	private String vehicleChangesComment;
	
	@NotNull
	private MultipartFile hexFile;

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

	public int getVehicleYear() {
		return vehicleYear;
	}

	public void setVehicleYear(int vehicleYear) {
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

	public MultipartFile getHexFile() {
		return hexFile;
	}

	public void setHexFile(MultipartFile hexFile) {
		this.hexFile = hexFile;
	}
	
	
	
}
