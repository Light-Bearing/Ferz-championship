package lb.ferzshow.controller;

import lb.ferzshow.dto.SettingsChampionship;
import lb.ferzshow.entity.Role;
import lb.ferzshow.entity.User;
import lb.ferzshow.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/settings")
@AllArgsConstructor
public class ChampionshipSettings {

    UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public SettingsChampionship getChampionship() {
//        return new SettingsChampionship().setName();
        return null;
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public SettingsChampionship adminAccess() {
        SettingsChampionship settingsChampionship = new SettingsChampionship();

//        List<User> mainJudges = userRepository.findByRoles("ROLE_MAIN_JUDGE");
        List<User> userList = userRepository.findAll();

        List<User> mainJudges = new ArrayList<>();
        List<User> judges = new ArrayList<>();
        for (User user : userList) {
            Set<Role> roleSet = user.getRoles();
            for (Role role : roleSet) {
                if (role.getName().name().equals("ROLE_MAIN_JUDGE")) {
                    mainJudges.add(user);
                }
                if (role.getName().name().equals("ROLE_JUDGE")) {
                    judges.add(user);
                }
            }

        }
//        settingsChampionship.setName();
//        settingsChampionship.setMainJudgeId();
        settingsChampionship.setMainJudges(mainJudges);
        settingsChampionship.setJudges(judges);

        return settingsChampionship;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void setChampionship(@RequestBody ) {


    }

}
