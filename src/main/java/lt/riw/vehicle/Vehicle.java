package lt.riw.vehicle;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "vehicle_repository")
public class Vehicle implements Serializable {

	private static final long serialVersionUID = 6327623771768272238L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "mark_id")
	private int markId;

	@Column(name = "model_id")
	private int modelId;

	@Column(name = "vehicle_year")
	private int vehicleYear;

	@Basic
	@Temporal(TemporalType.DATE)
	@Column(name = "date_repaired")
	private Date dateRepaired;

	@Column(name = "vehicle_changes_comment")
	private String vehicleChangesComment;

	@Column(name = "cubage")
	private int cubage;

	@Column(name = "gearbox_type")
	private String gearboxType;

	@Column(name = "license_plate")
	private String licensePlate;

	@Column(name = "dateAdded")
	private String dateAdded;

	@Column(name = "disabled")
	private boolean disabled;
	
	@Column(name = "removed")
	private boolean removed;
	
	public Vehicle(long id, int markId, int modelId, int vehicleYear, Date dateRepaired, String vehicleChangesComment,
			int cubage, String gearboxType, String licensePlate, String dateAdded, boolean disabled, boolean removed) {
		super();
		this.id = id;
		this.markId = markId;
		this.modelId = modelId;
		this.vehicleYear = vehicleYear;
		this.dateRepaired = dateRepaired;
		this.vehicleChangesComment = vehicleChangesComment;
		this.cubage = cubage;
		this.gearboxType = gearboxType;
		this.licensePlate = licensePlate;
		this.dateAdded = dateAdded;
		this.disabled = disabled;
		this.removed = removed;
	}


	public Vehicle() {
		super();
	}

	
	public String getDateAdded() {
		return dateAdded;
	}

	public void setDateAdded(String dateAdded) {
		this.dateAdded = dateAdded;
	}

	public String getLicensePlate() {
		return licensePlate;
	}

	public void setLicensePlate(String licensePlate) {
		this.licensePlate = licensePlate;
	}

	public int getCubage() {
		return cubage;
	}

	public Date getDateRepaired() {
		return dateRepaired;
	}

	public String getGearboxType() {
		return gearboxType;
	}

	public long getId() {
		return id;
	}

	public int getMarkId() {
		return markId;
	}

	public int getModelId() {
		return modelId;
	}

	public String getVehicleChangesComment() {
		return vehicleChangesComment;
	}

	public int getVehicleYear() {
		return vehicleYear;
	}

	public void setCubage(int cubage) {
		this.cubage = cubage;
	}

	public void setDateRepaired(Date dateRepaired) {
		this.dateRepaired = dateRepaired;
	}

	public void setGearboxType(String gearboxType) {
		this.gearboxType = gearboxType;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setMarkId(int markId) {
		this.markId = markId;
	}

	public void setModelId(int modelId) {
		this.modelId = modelId;
	}

	public void setVehicleChangesComment(String vehicleChangesComment) {
		this.vehicleChangesComment = vehicleChangesComment;
	}

	public void setVehicleYear(int vehicleYear) {
		this.vehicleYear = vehicleYear;
	}

	public boolean isDisabled() {
		return disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}

	public boolean isRemoved() {
		return removed;
	}

	public void setRemoved(boolean removed) {
		this.removed = removed;
	}


	@Override
	public String toString() {
		return "Vehicle [id=" + id + ", markId=" + markId + ", modelId=" + modelId + ", vehicleYear=" + vehicleYear
				+ ", dateRepaired=" + dateRepaired + ", vehicleChangesComment=" + vehicleChangesComment + ", cubage="
				+ cubage + ", gearboxType=" + gearboxType + ", licensePlate=" + licensePlate + "]";
	}

}