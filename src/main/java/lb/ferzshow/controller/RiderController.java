package lb.ferzshow.controller;

import lb.ferzshow.model.Rider;
import lb.ferzshow.repository.RiderRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RestController
@RequestMapping("/riders")
@RequiredArgsConstructor
public class RiderController {
    @NonNull
    private RiderRepository riderRepository;

    @GetMapping
    public List<Rider> getRiderList() {
        return riderRepository.findAll();
    }

    @GetMapping("/{id}")
    public Rider getRider(@PathVariable Long id) {
        return riderRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createRider(@RequestBody Rider rider) throws URISyntaxException {
        Rider savedRider = riderRepository.save(rider);
        return ResponseEntity.created(new URI("/riders/" + savedRider.getId())).body(savedRider);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateRider(@PathVariable Long id, @RequestBody Rider rider) {
        Rider currentRider = riderRepository.findById(id).orElseThrow(RuntimeException::new);
        currentRider.setName(rider.getName());
        currentRider.setSurname(rider.getSurname());
        currentRider.setPatronymic(rider.getPatronymic());
        currentRider = riderRepository.save(currentRider);
        return ResponseEntity.ok(currentRider);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteRider(@PathVariable Long id) {
        riderRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
