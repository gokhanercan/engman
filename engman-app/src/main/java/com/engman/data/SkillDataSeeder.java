package com.engman.data;

import com.engman.repo.SkillsRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SkillDataSeeder implements CommandLineRunner {

    private final SkillsRepo skillsRepo;

    public SkillDataSeeder(SkillsRepo skillsRepo) {
        this.skillsRepo = skillsRepo;
    }

    @Override
    public void run(String... args) {
        if (skillsRepo.count() == 0) { // Only insert if the database is empty
            skillsRepo.saveAll(InitialData.Skills);
            System.out.println("✅ Predefined skills inserted into MongoDB!");
        } else {
            System.out.println("✅ Skills data already exists. Skipping seeding.");
        }
    }
}