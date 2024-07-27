package engman.domain.time;

public class TimeFrame {

    public Integer Ticks;      //We make it calendar-time agnostic.

    public TimeFrame(Integer ticks) {
        Ticks = ticks;
        if(ticks<0) throw new RuntimeException("Ticks must be bigger than 0");
    }
}