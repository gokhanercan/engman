package engman.domain;

import java.util.ArrayList;

public class Environment {
    public String Name;
    public int Budget;

    public Environment(String name) {
        Name = name;
    }

    public ArrayList<Project> Projects;
    public void RunSimulation(int months){      //Composite pattern.
        //TODO:
    }
}