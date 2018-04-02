package lt.riw.vehicle;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "vehicle_model")
public class VehicleModel implements Serializable {

	private static final long serialVersionUID = 6327623771768272238L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "model")
	private String modelName;

	@Column(name = "mark_id")
	private int modelMarkId;

	public VehicleModel(String modelName, long id, int modelMarkId) {
		super();
		this.id = id;
		this.modelName = modelName;
		this.modelMarkId = modelMarkId;
	}

	public VehicleModel() {
		super();
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getModelMarkId() {
		return modelMarkId;
	}

	public void setModelMarkId(int modelMarkId) {
		this.modelMarkId = modelMarkId;
	}

	@Override
	public String toString() {
		return "VehicleModel [id=" + id + ", modelName=" + modelName + ", markId=" + modelMarkId + "]";
	}

}