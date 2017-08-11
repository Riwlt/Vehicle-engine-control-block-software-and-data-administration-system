package lt.riw.vehicle;

import java.io.Serializable;
import java.sql.Date;
import java.time.Year;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.mysql.jdbc.Blob;

@Entity
@Table(name = "mobility_vehicle")
public class Vehicle implements Serializable{
	
	private static final long serialVersionUID = 6327623771768272238L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "mark_name")
	private String markName;
	
	@Column(name = "vehicle_year")
	private Year vehicleYear;
	
	@Column(name = "date_repaired")
	private Date dateRepaired;
	
	@Column(name = "vehicle_changes_comment")
	private String vehicleChangesComment;
	
	@Column(name = "hex_file")
	@Lob
	private Blob hexFile;
	
	@Column(name = "model_name")
	private String modelName;

	public Vehicle(String markName, Year vehicleYear, Date dateRepaired, String vehicleChangesComment, Blob hexFile,
			String modelName) {
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
