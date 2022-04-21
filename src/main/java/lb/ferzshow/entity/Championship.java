package lb.ferzshow.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "championship")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Championship extends BaseEntity implements Serializable {
    @Column(name = "title", nullable = false)
    @NotEmpty
    @Size(max = 300)
    private String title;

    @Column(name = "date")
    @NotNull
    private Date date;

    @OneToOne
    @JoinColumn(name = "main_judge_id")
    private User mainJudge;

    @OneToMany(
            mappedBy = "championships_judge",
            cascade= CascadeType.ALL,
            orphanRemoval = true
    )

    private List<User> judgeList;

    @OneToMany(
            mappedBy = "championship",
            cascade= CascadeType.ALL,
            orphanRemoval = true
    )
    private List<AssessmentCategories> assessmentCategories = new ArrayList<>();

    public void addAssessmentCategories(AssessmentCategories categories){
        assessmentCategories.add(categories);
        //categories.setChampionship(this);

    }

    public void removeAssessmentCategories(AssessmentCategories categories){
        assessmentCategories.remove(categories);
       // categories.setChampionship(null);
    }
}

