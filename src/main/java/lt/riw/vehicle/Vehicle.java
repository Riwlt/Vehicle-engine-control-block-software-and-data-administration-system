package lt.riw.vehicle;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;


@Entity
@Table(name = "vehicle")
public class Vehicle implements Serializable {

	private static final long serialVersionUID = 6327623771768272238L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "mark_name")
	private String markName;

	@Column(name = "model_name")
	private String modelName;

	@Column(name = "vehicle_year")
	private int vehicleYear;

	@Column(name = "date_repaired")
	private Date dateRepaired;

	@Column(name = "vehicle_changes_comment")
	private String vehicleChangesComment;

	@Column(name = "hex_file")
	@Lob
	private byte[] hexFile;

	public Vehicle(String markName, int vehicleYear, Date dateRepaired, String vehicleChangesComment,
			byte[] hexFile, String modelName) {
		super();
		this.markName = markName;
		this.vehicleYear = vehicleYear;
		this.dateRepaired = dateRepaired;
		this.vehicleChangesComment = vehicleChangesComment;
		this.hexFile = hexFile;
		this.modelName = modelName;
	}

	public Vehicle() {
		super();
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

	public byte[] getHexFile() {
		return hexFile;
	}

	public void setHexFile(byte[] hexFile) {
		this.hexFile = hexFile;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	@Override
	public String toString() {
		return "Vehicle [markName=" + markName + ", vehicleChangesComment=" + vehicleChangesComment + ", modelName="
				+ modelName + "]";
	}

}
