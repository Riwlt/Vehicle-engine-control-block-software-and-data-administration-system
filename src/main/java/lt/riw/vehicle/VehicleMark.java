package lt.riw.vehicle;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;


@Entity
@Table(name = "vehicle_mark")
public class VehicleMark implements Serializable {

	private static final long serialVersionUID = 6327623771768272238L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "mark")
	private String markName;

	

	public VehicleMark(String markName,  long id) {
		super();
		this.id = id;
		this.markName = markName;
	
	}

	public VehicleMark() {
		super();
	}

	public String getMarkName() {
		return markName;
	}

	public void setMarkName (String markName) {
		this.markName = markName;
	}

	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "VehicleExample [markName=" + markName + "]";
	}



}