package lb.ferzshow.controller;

import lb.ferzshow.model.Championship;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/admin/championship")
public class AdminChampionshipController {

    @GetMapping("/")
    public Championship getLastChampionship(){
        return null;
    }
}
