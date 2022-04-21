package lb.ferzshow;

import lombok.AllArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@AllArgsConstructor
public class FerzShowApplication {

    public static void main(String[] args) {
        SpringApplication.run(FerzShowApplication.class, args);
    }

}
