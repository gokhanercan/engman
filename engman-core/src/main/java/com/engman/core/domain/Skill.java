package com.engman.core.domain;

public class Skill {
    public String Name;     //React/CQRS etc..
    public String Desc;

    public Skill(String name) {
        Name = name;
    }

    //TODO:
    private int Percentage = 50; //0-100     //Assuming 100 is world max knowledge.

    //How easy to learn + cross relations (transitivity)
}
