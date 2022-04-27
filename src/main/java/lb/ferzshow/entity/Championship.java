package lb.ferzshow.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "championship")
@Getter
@Setter
@NoArgsConstructor
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

    @ManyToMany(cascade= CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id",referencedColumnName = "id")
    private List<User> judgeList;
    @ManyToMany(cascade= CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id",referencedColumnName = "id")
    private List<Rider> riderList;
}

