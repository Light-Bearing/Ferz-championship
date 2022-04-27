package lb.ferzshow.controller;

import lb.ferzshow.dto.ChampionshipListDTO;
import lb.ferzshow.dto.ChampionshipParamDTO;
import lb.ferzshow.dto.SettingsChampionship;
import lb.ferzshow.entity.Championship;
import lb.ferzshow.entity.Rider;
import lb.ferzshow.entity.Role;
import lb.ferzshow.entity.User;
import lb.ferzshow.repository.ChampionshipRepository;
import lb.ferzshow.repository.RiderRepository;
import lb.ferzshow.repository.UserRepository;
import lb.ferzshow.service.ChampionshipService;
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

    private UserRepository userRepository;
    private RiderRepository riderRepository;
    private ChampionshipRepository championshipRepository;
    private ChampionshipService championshipService;

    @GetMapping("/list")
    @PreAuthorize("hasRole('ADMIN')")
    public ChampionshipListDTO getSettings() {
        List<Championship> championshipList = championshipRepository.findAllByOrderByIdDesc();
        List<ChampionshipParamDTO> championshipParamDTOList = new ArrayList<>();
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
        List<Rider> riderList = riderRepository.findAll();
        championshipList.forEach(el -> championshipParamDTOList.add(ChampionshipParamDTO.builder()
                .title(el.getTitle())
                .id(el.getId())
                .date(el.getDate())
                .build()));
        championshipParamDTOList.add(ChampionshipParamDTO.builder().id(-1L).title("").build());


        return ChampionshipListDTO.builder()
                .championshipList(championshipParamDTOList)
                .mainJudges(mainJudges)
                .judges(judges)
                .riders(riderList)
                .build();
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public SettingsChampionship getChampionshipParam(@RequestParam("id") Long id) {
        return championshipService.getChampionshipSettings(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void setSettings(@RequestBody SettingsChampionship settings) {

        championshipService.save(settings);
    }

}
