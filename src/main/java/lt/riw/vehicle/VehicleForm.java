package lt.riw.vehicle;

import java.util.Date;

public class VehicleForm {

	private String modelName;
	private String markName;
	private int vehicleYear;
	private Date dateRepaired;
	private String vehicleChangesComment;
	private int cubage;
	private String gearboxType;
	private byte[] hexFile;

	public VehicleForm(String modelName, String markName, int vehicleYear, Date dateRepaired,
			String vehicleChangesComment, int cubage, String gearboxType, byte[] hexFile) {
		super();
		this.modelName = modelName;
		this.markName = markName;
		this.vehicleYear = vehicleYear;
		this.dateRepaired = dateRepaired;
		this.vehicleChangesComment = vehicleChangesComment;
		this.cubage = cubage;
		this.gearboxType = gearboxType;
		this.hexFile = hexFile;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public String getMarkName() {
		return markName;
	}

	public void setMarkName(String markName) {
		this.markName = markName;
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

	public int getCubage() {
		return cubage;
	}

	public void setCubage(int cubage) {
		this.cubage = cubage;
	}

	public String getGearboxType() {
		return gearboxType;
	}

	public void setGearboxType(String gearboxType) {
		this.gearboxType = gearboxType;
	}

	public byte[] getHexFile() {
		return hexFile;
	}

	public void setHexFile(byte[] hexFile) {
		this.hexFile = hexFile;
	}

	public VehicleForm() {
		super();
	}

}
