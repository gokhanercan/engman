package com.engman.core.domain.feeds;

import com.engman.core.domain.balance.Liquid;
import org.apache.commons.lang3.tuple.Pair;

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

    //Temp dynamic field mngmnt. TODO: Generalize
    public ArrayList<Pair<String,String>> Fields = new ArrayList<>();
    public void SetField(String fieldName, String value) {      //add,set,upsert.   //todo:Add more types.
        Fields.add(Pair.of(fieldName, value.toString()));
    }
    public void DefineField(String fieldName) {     //todo:define field type
        Fields.add(Pair.of(fieldName, null));
    }
}
