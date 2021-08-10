package lb.ferzshow.message.request;

import lb.ferzshow.model.Role;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
public class SignUpForm {

    @NotEmpty
    @Size(max = 128)
    private String email;

    @NotBlank
    @Size(min = 2, max = 50)
    private String username;

    @NotBlank
    @Size(min = 3, max = 128)
    private String surname;

    @NotBlank
    @Size(min = 3, max = 128)
    private String name;

    @Size(max = 128)
    private String patronymic;

    @NotBlank
    @Size(min = 6, max = 256)
    private String password;

    private Set<String> role;

}
