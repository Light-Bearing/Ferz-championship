package lb.ferzshow.dto;

import lb.ferzshow.entity.Rider;
import lombok.Data;

import java.util.List;

@Data
public class VoiceDTO {
    private String userName;
    private Rider rider;
    private List<Integer> score;
}
