package lb.ferzshow.message.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UpdatePasswordRequest {
    @NotNull
    private Long id;

    @NotBlank
    @Size(min = 6, max = 50, message = "Длина пароль должны быть от 6 до 50 символов")
    private String password;
}
