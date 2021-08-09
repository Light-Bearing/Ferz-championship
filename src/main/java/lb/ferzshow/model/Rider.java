package lb.ferzshow.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "rider")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Rider extends BaseEntity implements Serializable {
    @Column(name = "sourname", nullable = false)
    @NotEmpty
    @Size(max = 128)
    @NotNull
    private String sourname;

    @Column(name = "name", nullable = false)
    @NotEmpty
    @NotNull
    @Size(max = 128)
    private String name;

    @Column(name = "patronymic")
    @Size(max = 128)
    private String patronymic;

}
