package lb.ferzshow.repository;

import lb.ferzshow.model.Rider;
import lb.ferzshow.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public interface RiderRepository extends JpaRepository<Rider, Integer> {

}


