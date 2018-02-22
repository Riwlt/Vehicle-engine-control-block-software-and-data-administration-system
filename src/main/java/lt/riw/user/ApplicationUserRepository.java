package lt.riw.user;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ApplicationUserRepository extends CrudRepository<ApplicationUser, Long> {
    List<ApplicationUser> findByUsername(String username);
}