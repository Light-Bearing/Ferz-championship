package lb.ferzshow.repository;

import lb.ferzshow.entity.Championship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ChampionshipRepository extends JpaRepository<Championship, Long> {
     List<Championship> findAllByOrderByIdDesc();


}

