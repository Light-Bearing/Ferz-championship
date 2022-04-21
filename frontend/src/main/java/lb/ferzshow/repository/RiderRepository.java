package lb.ferzshow.repository;

import lb.ferzshow.entity.Rider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public interface RiderRepository extends JpaRepository<Rider, Long> {

}


