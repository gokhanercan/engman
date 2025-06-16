package com.engman.core.domain;

import com.engman.core.domain.balance.Liquid;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.AbstractMap.SimpleEntry;
import java.util.UUID;

public class Developer {
    public UUID id;
    public String name;
    public List<Skill> skills = new ArrayList<>();

    public Liquid Balance = new Liquid(0);
    public int TickSalary;      //Salary per tick

    public Developer(String name, List<Skill> initialSkills, Integer tickSalary) {
        TickSalary = tickSalary;
        name = name;
        if(initialSkills == null) return;
        for (Skill s : initialSkills) {
            skills.add(s);
        }
    }
    public Developer(String name, List<Skill> initialSkills) {
        this(name,initialSkills,0);
    }
    public Developer(String name) {
        this(name,null,  0);
    }

    //Temp dynamic field mngmnt. TODO: Generalize
//    public ArrayList<SimpleEntry<String,String>> Fields = new ArrayList<>();

    public HashMap<String,Field> fields = new HashMap<>();

    public void setField(String fieldName, String value, String ownerModuleName) {      //add,set,upsert.   //todo:Add more types.
        fields.put(fieldName,new Field(fieldName, value, ownerModuleName));
    }
    public void defineField(String fieldName, String ownerModuleName) {     //todo:define field type
        fields.put(fieldName, new Field(fieldName, "", ownerModuleName));
    }
}
