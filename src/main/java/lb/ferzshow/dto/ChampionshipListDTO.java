package lb.ferzshow.dto;

import lb.ferzshow.entity.Rider;
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
public class ChampionshipListDTO {
    private List<ChampionshipParamDTO> championshipList;
    private List<User> mainJudges;
    private List<User> judges;
    private List<Rider> riders;
}
