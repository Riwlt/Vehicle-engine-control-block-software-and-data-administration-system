package lt.riw.users;

import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<Users, Long>{
	Users findByUsername (String userName);
	Users findById (long id); 
	Users deleteById (long id);
	boolean existsById (long id);
}
