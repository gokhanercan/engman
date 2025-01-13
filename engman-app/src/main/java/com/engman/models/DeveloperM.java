package com.engman.models;

import java.util.List;

public record DeveloperM(String Name, Integer Age, List<SkillLevelM> SkillLevels)//List<SkillM> Skills,
{
//    public DeveloperM(String Name, Integer Age, List<SkillM> Skills) {
//        this(Name, Age, Skills, null);
//    }
}