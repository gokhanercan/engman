import domain.resources.Developer;
import domain.environment.Project;
import domain.resources.Skill;
import domain.time.TimeFrame;

import org.testng.annotations.Test;

import static org.testng.Assert.assertEquals;

public class ProjectTest {

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