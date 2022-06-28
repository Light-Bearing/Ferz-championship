package lb.ferzshow.utils;

public class Stopwatch {
    private final Long time;
    private final Long extraTime;
    private SendTime writeTime;

    public Stopwatch(Long time, Long extraTime, SendTime sendTime) {
        this.time = time;
        this.extraTime = extraTime;
        writeTime = sendTime;
    }

    public void start() throws InterruptedException {
        for (long i = 1; i <= time; i++) {
            Thread.sleep(1000);
            somthingDo(String.valueOf(i));
        }
        Thread.sleep(1000);
        somthingDo("x2");
        Thread.sleep(1000);
        for (long i = extraTime; i >= 0; i--) {
            Thread.sleep(1000);
            somthingDo(String.valueOf(i));
        }
    }

    private void somthingDo(String i) {
        System.out.println(i);
        writeTime.sendTime(i);
    }


}
