package lb.ferzshow.message.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data

public class JwtResponse {
    public JwtResponse(String token, String username, String surname, String name, Collection<? extends GrantedAuthority> authorities) {
        this.token = token;
        this.username = username;
        this.surname = surname;
        this.name = name;
        this.authorities = authorities;
    }

    private String token;
    private String tokenType = "Bearer";
    private String username;
    private String surname;
    private String name;
    private Collection<? extends GrantedAuthority> authorities;



}
