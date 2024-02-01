package com.engman.domain;

import java.util.ArrayList;

public class Project {
    public String Name;
    public ArrayList<Developer> Developers;

    public ArrayList<Skill> SkillsRequired;

    public Project(String name) {
        Name = name;
    }
}
