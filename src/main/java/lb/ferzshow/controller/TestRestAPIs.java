package lb.ferzshow.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class TestRestAPIs {

    @GetMapping("/api/test/judge")
    @PreAuthorize("hasRole('JUDGE') or hasRole('ADMIN')")
    public String userAccess() {
        return ">>> User Contents!";
    }

    @GetMapping("/api/test/pm")
    @PreAuthorize("hasRole('PM') or hasRole('ADMIN')")
    public String projectManagementAccess() {
        return ">>> Project Management Board";
    }



    @GetMapping("/api/test/main_judge")
    @PreAuthorize("hasRole('MAIN_JUDGE') or hasRole('ADMIN')")
    public String mainJudgeAccess() {
        return ">>> Main JUDGE Contents";
    }
}
