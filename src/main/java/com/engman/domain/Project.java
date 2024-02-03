package com.engman.domain;

import com.engman.domain.balance.Liquid;
import com.engman.domain.time.TimeFrame;
import java.util.ArrayList;
import java.util.List;

public class Project {
    public String Name;
    public List<Developer> Developers = new ArrayList<>();

    public List<Skill> SkillsRequired;

    public Liquid Balance;

    public Project(String name, Integer initialBudget) {
        Name = name;
        Balance = new Liquid(initialBudget);
    }

    public Project Run(TimeFrame tf){
        //TODO: We need a deep copy here. Take a snapshot of the entire setting.    Prototype pattern.
        for (int t = 0; t < tf.Ticks; t++) {
            for (Developer dev : Developers) {
                Integer newBalance = Balance.Transfer(dev.TickSalary * -1);
            }
        }
        return this;
    }
}
