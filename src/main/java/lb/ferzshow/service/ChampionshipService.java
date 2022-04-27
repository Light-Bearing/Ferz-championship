package lb.ferzshow.service;


import lb.ferzshow.dto.SettingsChampionship;

public interface ChampionshipService {

    void save(SettingsChampionship settingsChampionship);

    SettingsChampionship getChampionshipSettings(Long id);
}
