package com.engman.core.domain.feeds;



import com.engman.core.domain.balance.Liquid;

import java.util.ArrayList;
import java.util.List;

public class Developer {
    public String Name;
    public List<Skill> Skills = new ArrayList<>();     //abs:IList==List,    conc: List,ArrayList

    public Liquid Balance = new Liquid(0);
    public int TickSalary;      //Salary per tick

    public Developer(String name, Skill[] initialSkills, Integer tickSalary) {
        TickSalary = tickSalary;
        Name = name;
        for (Skill s : initialSkills) {
            Skills.add(s);
        }
    }
    public Developer(String name, Skill[] initialSkills) {
        this(name,initialSkills,0);
    }
    public Developer(String name) {
        this(name,new Skill[]{},0);
    }
}
