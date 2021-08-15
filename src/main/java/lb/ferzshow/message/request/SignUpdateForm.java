package lb.ferzshow.message.request;

import lb.ferzshow.model.Role;
import lb.ferzshow.model.User;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@Data
public class SignUpdateForm {

    @NotEmpty
    private Long id;

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

    @NotEmpty(message = "Роли должны быть заполены")
    private List<Long> roleId;

    public User toUser(List<Role> allRoles) {
        Map<Long, Role> roleById = allRoles
                .stream()
                .collect(Collectors.toMap(Role::getId, role -> role));

        return User
                .builder()
                .name(this.name)
                .username(this.username)
                .email(this.email)
                .password(this.password)
                .roles(roleId
                        .stream()
                        .filter(roleById::containsKey)
                        .map(roleById::get)
                        .collect(Collectors.toList()))
                .build();
    }

    public User updateUser(User user) {
        return user
                .toBuilder()
                .name(this.name)
                .username(this.username)
                .email(this.email)
                .build();
    }
}

