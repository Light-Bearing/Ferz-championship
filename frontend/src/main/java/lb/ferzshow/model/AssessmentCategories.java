package lb.ferzshow.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "assessment_categories")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AssessmentCategories extends BaseEntity implements Serializable {
    @Column(name = "name_eng", nullable = false)
    @NotEmpty
    @Size(max = 128)
    private String nameEng;

    @Column(name = "name_rus", nullable = false)
    @NotEmpty
    @Size(max = 128)
    private String nameRus;
}
