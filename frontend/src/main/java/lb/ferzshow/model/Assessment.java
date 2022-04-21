package lb.ferzshow.model;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "assessment")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Assessment extends BaseEntity implements Serializable {
    @ManyToOne(fetch = FetchType.LAZY)
    private User judge;
    @ManyToOne(fetch = FetchType.LAZY)
    private AssessmentCategories category;
    @ManyToOne(fetch = FetchType.LAZY)
    private Rider rider;
    @NotNull
    private Integer jumpNumber;
    @NotNull
    private Integer asessment;
    @ColumnDefault("false")
    private Boolean dblAssessment;

}
