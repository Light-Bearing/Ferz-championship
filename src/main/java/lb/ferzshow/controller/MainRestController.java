package lb.ferzshow.controller;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lb.ferzshow.utils.Stopwatch;
import org.springdoc.core.converters.models.PageableAsQueryParam;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.listenvision.led;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

@RestController
@Tag(name = "Главный контроллер", description = "Все функции тут")
public class MainRestController {
    final private int LED_COLOR_RES = 0xff;

    @RequestMapping("/")
    @Hidden
    public ResponseEntity<?> root() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "/swagger-ui.html");
        return new ResponseEntity<String>(headers, HttpStatus.FOUND);
    }

    @PostMapping("/SetProgramm")

    @Operation(description = "Добавление текста на экран")
    public Integer setText(@RequestParam Integer programTime,
                           @RequestParam Integer loopCount,
                           @RequestParam String text) throws IOException {

        int hProgram = led.CreateProgram(96, 32, 1);

        led.AddProgram(hProgram, 1, programTime, loopCount);

        led.AddImageTextArea(hProgram, 1, 1, 0, 0, 96, 32, 0);

        String str = new String(text.getBytes(),"CP1251");
        BufferedWriter writer = new BufferedWriter(new FileWriter("1.txt"));
        writer.write(str);
        writer.close();

        led.AddMultiLineTextToImageTextArea(hProgram, 1, 1, 1, "1.txt", "Times New Roman", 9, 0xff, 0, 0, 0, 1, 4, 2, 1, 1);

        System.out.println(led.NetWorkSend("192.168.100.97", hProgram));

        led.DeleteProgram(hProgram);
        return hProgram;

    }

    @PostMapping("/setBrightness")
    public int setBrightnes(@RequestParam Integer brightness) {
        return led.SetBrightness("192.168.100.97", brightness);
    }

    @PostMapping("/AdjustTime")
    public int writeAdjustTime() {
        return led.AdjustTime("192.168.100.97");
    }

    @PostMapping("/SetBasicInfo")
    @Operation(description = "Вывод базовой информации")
    public int startSetBasicInfo() {
        return led.SetBasicInfo("192.168.100.97", 1, 96, 32);
    }

    @PostMapping("/test")
    @Operation(description = "Запуск теста")
    public int startTest(@RequestParam int testValue) {
        return led.LedTest("192.168.100.97", testValue);
    }

    @PostMapping("/on")
    public int on() {
        return led.PowerOnOff("192.168.100.97", 0);
    }

    @PostMapping("/off")
    public int off() {
        return led.PowerOnOff("192.168.100.97", 1);
    }

    @PostMapping("/startTimer")
    public void startTime(){
        Stopwatch stopwatch = new Stopwatch(90L,30L, this::printTime);
        try {
            stopwatch.start();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }
    @PostMapping("/startTimer2")
    public void startTime2(){
        int hProgram = led.CreateProgram(96, 32, 1);
        led.AddProgram(hProgram, 1, 0, 1);
        led.AddImageTextArea(hProgram,1,1,0,0,96,32,0);
        for (int i = 0; i < 10; i++) {
            led.AddStaticTextToImageTextArea(hProgram,1,1,0,String.valueOf(i),"Arial",16,LED_COLOR_RES,1,0,0,0,2,1);
            led.NetWorkSend("192.168.100.97",hProgram);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        led.DeleteProgram(hProgram);

    }

    public Integer printTime(Long time){
        int hProgram = led.CreateProgram(96, 32, 1);
        led.AddProgram(hProgram, 1, 0, 1);
        led.AddImageTextArea(hProgram,1,1,0,0,96,32,0);
        led.AddStaticTextToImageTextArea(hProgram,1,1,0,time.toString(),"Arial",16,LED_COLOR_RES,1,0,0,0,2,1);
        led.NetWorkSend("192.168.100.97",hProgram);
        led.DeleteProgram(hProgram);
        return 0;
    }
}

