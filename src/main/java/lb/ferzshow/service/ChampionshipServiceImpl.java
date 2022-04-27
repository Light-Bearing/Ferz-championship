package lb.ferzshow.service;

import lb.ferzshow.dto.CheckedUser;
import lb.ferzshow.dto.SettingsChampionship;
import lb.ferzshow.entity.Championship;
import lb.ferzshow.entity.Rider;
import lb.ferzshow.entity.User;
import lb.ferzshow.repository.ChampionshipRepository;
import lb.ferzshow.repository.RiderRepository;
import lb.ferzshow.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Array;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ChampionshipServiceImpl implements ChampionshipService {

    private ChampionshipRepository championshipRepository;
    private UserRepository userRepository;
    private RiderRepository riderRepository;

    @Transactional
    public void save(SettingsChampionship settingsChampionship) {
        Championship championship;
        if (settingsChampionship.getId() != -1) {
            championship = championshipRepository.getById(settingsChampionship.getId());
        } else {
            championship = new Championship();
        }

        if (!settingsChampionship.getJudges().isEmpty()) {
            List<User> judgesList = userRepository.findByIdIn(settingsChampionship.getJudgesIdList());
            championship.setJudgeList(judgesList);
        }

        if (!settingsChampionship.getRiders().isEmpty()) {
            List<Rider> riderList = riderRepository.findByIdIn(settingsChampionship.getRidersIdList());
            championship.setRiderList(riderList);
        }
        championship.setTitle(settingsChampionship.getTitle());

        Date date = new Date(System.currentTimeMillis());
        championship.setDate(date);
        User mainJudge = userRepository.getById(settingsChampionship.getMainJudgeId());
        championship.setMainJudge(mainJudge);

        championshipRepository.save(championship);
    }

    @Override
    @Transactional
    public SettingsChampionship getChampionshipSettings(Long id) {
        Optional<Championship> championship = championshipRepository.findById(id);
        if (championship.isPresent()) {
            return SettingsChampionship.getSettingsChampionship(championship.get());
        }
        return new SettingsChampionship(-1L,"",0L, new ArrayList<>(), new ArrayList<>());
    }
}
