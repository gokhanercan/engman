package com.engman.domain;

import java.util.ArrayList;
import java.util.List;

public class Developer {
    public String Name;
    public List<Skill> Skills = new ArrayList<>();     //abs:IList==List,    conc: List,ArrayList

    public Developer(String name, Skill[] initialSkills) {
        Name = name;
        for (Skill s : initialSkills) {
            Skills.add(s);
        }
    }
}
