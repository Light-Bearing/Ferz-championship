package lb.ferzshow.dto;

import lb.ferzshow.entity.Championship;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SettingsChampionship {
    private Long id;
    private String title;
    private Long mainJudgeId;
    private List<CheckedUser> judges;
    private List<CheckedUser> riders;

    public static SettingsChampionship getSettingsChampionship(Championship championship) {
        return SettingsChampionship.builder()
                .id(championship.getId())
                .mainJudgeId(championship.getMainJudge().getId())
                .judges(championship.getJudgeList().stream().map(el->new CheckedUser(el.getId(),true)).collect(Collectors.toList()))
                .riders(championship.getRiderList().stream().map(el->new CheckedUser(el.getId(),true)).collect(Collectors.toList()))
                .build();
    }

    public List<Long> getJudgesIdList() {
        List<Long> result = new ArrayList<>();
        judges.forEach(el->result.add(el.getId()));
        return result;
    }

    public List<Long> getRidersIdList() {
        List<Long> result = new ArrayList<>();
        riders.forEach(el->result.add(el.getId()));
        return result;
    }
}
