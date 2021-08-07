package lb.ferzshow.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(title = "Ferz show", version = "0.0.1",description = "Программа для шоу Ферзей")
)
public class OpenAPI {
}
