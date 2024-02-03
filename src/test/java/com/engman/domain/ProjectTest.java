package com.engman.domain;

import com.engman.domain.time.TimeFrame;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ProjectTest {

    @Test
    void run() {
        Project target = new Project("p1",1000);
        Skill s1 = new Skill("dotnet");
        target.Developers.add(new Developer("Dev1", new Skill[]{s1},10));
        target.Developers.add(new Developer("Dev2", new Skill[]{s1},10));
        Project actual = target.Run(new TimeFrame(10));

        assertEquals(800,actual.Balance.GetCurrent());
    }
}