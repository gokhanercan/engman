package com.engman.core.module;

import com.engman.core.domain.Developer;
import com.engman.core.domain.Skill;
import com.engman.core.domain.environment.Project;

import java.util.ArrayList;
import java.util.List;

public class ModuleContext {

    public List<Developer> Developers = new ArrayList<>();
    public List<Skill> Skills = new ArrayList<>();
    public List<Project> Projects = new ArrayList<>();

}