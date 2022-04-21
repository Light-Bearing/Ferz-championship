package lb.ferzshow.message.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class UpdateRolesRequest {

    @NotNull
    private Long userId;

    @NotEmpty(message = "Роли должны быть заполены")
    private List<Long> roleIds;

}
