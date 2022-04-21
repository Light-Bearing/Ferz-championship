package lb.ferzshow.entity;


import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users",uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "username"
        }),
        @UniqueConstraint(columnNames = {
                "email"
        })
})
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
@AllArgsConstructor
@ToString(callSuper = true, exclude = {"password"})
public class User extends BaseEntity implements Serializable {
    @Column(name = "email", nullable = false, unique = true)
    @Email
    @NotEmpty
    @Size(max = 128)
    private String email;

    @NotBlank
    @Size(min = 2, max=50)
    @Column(name = "username")
    private String username;

    @Column(name = "surname")
    @Size(max = 128)
    private String surname;

    @Column(name = "name")
    @Size(max = 128)
    private String name;

    @Column(name = "patronymic")
    @Size(max = 128)
    private String patronymic;

    @Column(name = "password")
    @Size(max = 256)
    private String password;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @Cascade({CascadeType.MERGE})
    @Singular
    private Set<Role> roles = new HashSet<>();

    public User(String email, String username, String surname, String name, String patronymic, String password) {
        this.email = email;
        this.username = username;
        this.surname = surname;
        this.name = name;
        this.patronymic = patronymic;
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = StringUtils.hasText(email) ? email.toLowerCase() : null;
    }
}
