package lb.ferzshow.controller;

import com.listenvision.led;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lb.ferzshow.utils.Stopwatch;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@Tag(name = "Главный контроллер", description = "Все функции тут")
public class MainRestController {
    public static final String IP_STR = "192.168.100.96";
    final private int LED_COLOR_RES = 0xff;

    @RequestMapping("/")
    @Hidden
    public ResponseEntity<?> root() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "/swagger-ui.html");
        return new ResponseEntity<String>(headers, HttpStatus.FOUND);
    }

    @PostMapping("/SetText")

    @Operation(description = "Добавление текста на экран")
    public Integer setText(@RequestParam Integer programTime,
                           @RequestParam Integer loopCount,
                           @RequestParam Integer fontSize,
                           @RequestParam String text) throws IOException {

        int hProgram = led.CreateProgram(96, 32, 1);

        led.AddProgram(hProgram, 1, programTime, loopCount);

        led.AddImageTextArea(hProgram, 1, 1, 0, 0, 96, 32, 0);

        led.AddMultiLineTextToImageTextArea(hProgram, 1, 1, 0, text, "Times New Roman", fontSize, 0xff, 0, 0, 0, 1, 4, 2, 1, 1);

        System.out.println(led.NetWorkSend(IP_STR, hProgram));

        led.DeleteProgram(hProgram);
        return hProgram;

    }
    @PostMapping("/SetProgramm")

    @Operation(description = "Добавление текста на экран")
    public Integer setProgram(@RequestParam Integer programTime,
                           @RequestParam Integer loopCount,
                           @RequestParam Integer fontSize,
                           @RequestParam String text) throws IOException {

        int hProgram = led.CreateProgram(96, 32, 1);

        led.AddProgram(hProgram, 1, programTime, loopCount);

        led.AddImageTextArea(hProgram, 1, 1, 0, 0, 96, 32, 0);

//        BufferedWriter writer = new BufferedWriter(new FileWriter("1.txt"));
//        writer.write(text.toCharArray());
//        writer.close();

        led.AddMultiLineTextToImageTextArea(hProgram, 1, 1, 1, "1.txt", "Times New Roman", fontSize, 0xff, 0, 0, 0, 1, 4, 2, 1, 1);

        System.out.println(led.NetWorkSend(IP_STR, hProgram));

        led.DeleteProgram(hProgram);
        return hProgram;

    }

    @PostMapping("/setBrightness")
    public int setBrightnes(@RequestParam Integer brightness) {
        return led.SetBrightness(IP_STR, brightness);
    }

    @PostMapping("/AdjustTime")
    public int writeAdjustTime() {
        return led.AdjustTime(IP_STR);
    }

    @PostMapping("/SetBasicInfo")
    @Operation(description = "Вывод базовой информации")
    public int startSetBasicInfo() {
        return led.SetBasicInfo(IP_STR, 1, 96, 32);
    }

    @PostMapping("/test")
    @Operation(description = "Запуск теста")
    public int startTest(@RequestParam int testValue) {
        return led.LedTest(IP_STR, testValue);
    }

    @PostMapping("/on")
    public int on() {
        return led.PowerOnOff(IP_STR, 0);
    }

    @PostMapping("/off")
    public int off() {
        return led.PowerOnOff(IP_STR, 1);
    }

    @PostMapping("/startTimer")
    public void startTime(){
        long l = System.currentTimeMillis();
        Stopwatch stopwatch = new Stopwatch(20L,30L, this::printTime);
        try {
            stopwatch.start();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Total: "+ (System.currentTimeMillis()-l));
    }

    public void printTime(String text){
        int hProgram = led.CreateProgram(96, 32, 1);
        led.AddProgram(hProgram, 1, 0, 1);
        led.AddImageTextArea(hProgram,1,1,0,0,96,32,0);
        led.AddStaticTextToImageTextArea(hProgram,1,1,0,text,"Arial",10,LED_COLOR_RES,1,0,0,0,2,1);
        led.NetWorkSend(IP_STR,hProgram);
        led.DeleteProgram(hProgram);
    }
}

