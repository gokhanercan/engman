package com.engman.models;

import java.util.ArrayList;

public record ProjectM(Long ID, String Name, String Description, int Budget, ArrayList<SkillLevelM> RequiredSkills, ArrayList<DeveloperM> Developers){}