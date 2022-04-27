package lb.ferzshow.repository;

import lb.ferzshow.entity.Rider;
import lb.ferzshow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface RiderRepository extends JpaRepository<Rider, Long> {

    List<Rider> findByIdIn(List<Long> riderIdList);
}


