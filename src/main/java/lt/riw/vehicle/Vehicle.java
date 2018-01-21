package lt.riw.vehicle;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "vehicle_repository")
public class Vehicle implements Serializable {

	private static final long serialVersionUID = 6327623771768272238L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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

	@Column(name = "hex_file")
	@Lob
	private byte[] hexFile;

	public Vehicle(int markId, int vehicleYear, Date dateRepaired, String vehicleChangesComment, byte[] hexFile,
			int modelId, int cubage, String gearboxType, long id) {
		super();
		this.id = id;
		this.markId = markId;
		this.vehicleYear = vehicleYear;
		this.dateRepaired = dateRepaired;
		this.vehicleChangesComment = vehicleChangesComment;
		this.hexFile = hexFile;
		this.modelId = modelId;
		this.gearboxType = gearboxType;
		this.cubage = cubage;
	}

	public Vehicle() {
		super();
	}

	public int getMarkId() {
		return markId;
	}

	public void setMarkId(int markId) {
		this.markId = markId;
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

	public int getModelId() {
		return modelId;
	}

	public void setModelId(int modelId) {
		this.modelId = modelId;
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

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "Vehicle [markId=" + markId + ", modelId=" + modelId + ", vehicleYear=" + vehicleYear + ", dateRepaired="
				+ dateRepaired + ", vehicleChangesComment=" + vehicleChangesComment + ", cubage=" + cubage
				+ ", gearboxType=" + gearboxType + ", hexFile=" + Arrays.toString(hexFile) + "]";
	}

}