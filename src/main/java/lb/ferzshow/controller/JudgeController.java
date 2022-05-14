package lb.ferzshow.controller;

import lb.ferzshow.dto.VoiceDTO;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/judge")
@AllArgsConstructor
public class JudgeController {

    @PostMapping
    public VoiceDTO voided(@RequestBody VoiceDTO voiceDTO){
        System.out.println(voiceDTO);
        return voiceDTO;
    }
}
