package lb.ferzshow.controller;

import lb.ferzshow.security.AuthUser;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/account")
public class AccauntController {

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Object get(@AuthenticationPrincipal AuthUser authUser){
        return authUser.getUser();
    }
}
