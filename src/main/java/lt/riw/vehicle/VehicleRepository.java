package lt.riw.vehicle;

import org.springframework.data.repository.CrudRepository;

public interface VehicleRepository extends CrudRepository<Vehicle, Long> {
	
	Vehicle findById(long id);

	Vehicle deleteById(long id);

	boolean existsById(long id);
}