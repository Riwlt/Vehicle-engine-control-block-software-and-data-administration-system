package lt.riw.customers;

import org.springframework.data.repository.CrudRepository;


public interface CustomerRepository extends CrudRepository<Customer, Long>{
	Customer findByfirstName (String firstName);
	Customer findBylastName (String lastName);
	Customer findBycustCity (String custCity);
	Customer findBycustAge (int custAge);
	Customer findById (long id);
	Customer deleteById (long id);
	boolean existsById (long id);
}
