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
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "file_repository")
public class VehicleFile implements Serializable{


	private static final long serialVersionUID = 6614704055916576644L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "file_name")
	private String fileName;
	
	@Column(name = "file_blob")
	@Lob
	private byte[] fileBlob;

	@Column(name = "date_added")
	private String dateAdded;

	@Column(name = "vehicle_id")
	private int vehicleId;
	
	@Column(name = "disabled")
	private boolean disabled;
	
	public VehicleFile(long id, String fileName, byte[] fileBlob, String dateAdded, int vehicleId, boolean disabled) {
		super();
		this.id = id;
		this.fileName = fileName;
		this.fileBlob = fileBlob;
		this.dateAdded = dateAdded;
		this.vehicleId = vehicleId;
		this.disabled = disabled;
	}

	public VehicleFile() {
		super();
	}

	
	public int getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public byte[] getFileBlob() {
		return fileBlob;
	}

	public void setFileBlob(byte[] fileBlob) {
		this.fileBlob = fileBlob;
	}

	public String getDateAdded() {
		return dateAdded;
	}

	public void setDateAdded(String dateAdded) {
		this.dateAdded = dateAdded;
	}

	public boolean isDisabled() {
		return disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}

	@Override
	public String toString() {
		return "VehicleFile [id=" + id + ", fileName=" + fileName + ", fileBlob=" + Arrays.toString(fileBlob)
				+ ", dateAdded=" + dateAdded + ", vehicleId=" + vehicleId + ", disabled=" + disabled + "]";
	}

}
