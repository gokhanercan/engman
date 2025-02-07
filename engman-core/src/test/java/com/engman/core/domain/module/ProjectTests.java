package com.engman.core.domain.module;

import com.engman.core.domain.environment.Project;
import com.engman.core.domain.Developer;
import com.engman.core.domain.Skill;
import com.engman.core.domain.time.TimeFrame;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ProjectTests {

    @Test
    public void Run_ProjectWithTwoDevelopers_TransferBudget() {
        Project target = new Project("p1", 1000);
        Skill s1 = new Skill("dotnet");
        Developer d1 = new Developer("Dev1", new Skill[]{s1}, 10);
        target.Developers.add(d1);
        target.Developers.add(new Developer("Dev2", new Skill[]{s1}, 10));
        Project actual = target.Run(new TimeFrame(10));

        assertEquals(800, actual.Balance.GetCurrent());
        assertEquals(100, d1.Balance.GetCurrent());
    }
}
