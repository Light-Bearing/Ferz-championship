package lb.ferzshow.dto;

import lb.ferzshow.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SettingsChampionship {
    private String name;

    private int mainJudgeId;
    private List<User> mainJudges;
    private List<User> judges;

//    private List<Judge> judges;
}
