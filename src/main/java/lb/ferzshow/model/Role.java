package lb.ferzshow.model;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ADMIN,
    MAIN_JUDGE,
    JUDGE;



    @Override
    public String getAuthority() {
        return "ROLE_" + name();
    }
}
