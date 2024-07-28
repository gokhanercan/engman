package domain;

import domain.environment.Environment;
import domain.environment.Project;
import domain.resources.Developer;
import domain.resources.Skill;
import domain.time.*;

public class Main {
    public static void main(String[] args) {
        Environment eastdil = new Environment("Eastdil");
        Project p1 = new Project("p1",1000);
        Skill js = new Skill("js");
        Skill react = new Skill("react");
        Skill dotnet = new Skill("dotnet");
        Skill azure = new Skill("azure");
        Skill playwright = new Skill("playwright");
        Skill selenium = new Skill("selenium");

        eastdil.Projects.add(p1);
        p1.Developers.add(new Developer("Dev1",new Skill[]{js,dotnet},10 ));
        p1.Developers.add(new Developer("Dev2",new Skill[]{js,dotnet},10 ));
        p1.Developers.add(new Developer("Dev3",new Skill[]{js,react},10 ));
        p1.Developers.add(new Developer("Dev4",new Skill[]{selenium,dotnet},10 ));
        Project actual = p1.Run(new TimeFrame(10));
        System.out.println("Hello EngMan. Project's final budget is: " + actual.Balance.GetCurrent());
    }
}