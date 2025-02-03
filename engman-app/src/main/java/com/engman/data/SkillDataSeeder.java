package com.engman.data;

import com.engman.models.SkillM;
import com.engman.repo.SkillsRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.UUID;

@Component
public class SkillDataSeeder implements CommandLineRunner {

    private final SkillsRepo skillsRepo;

    public SkillDataSeeder(SkillsRepo skillsRepo) {
        this.skillsRepo = skillsRepo;
    }

    private final SkillM aws = new SkillM( "AWS", "Cloud platform", 10, "gold");
    private final SkillM java = new SkillM("Java", "Java lang", 10, "skyblue");
    private final SkillM dotnet = new SkillM("dotnet", ".NET is a Microsoft framework for building and running applications on web, mobile, desktop, and cloud platforms.", 10, "tomato");
    private final SkillM azure = new SkillM("Azure", "Azure is Microsoft's cloud platform for building, deploying, and managing applications globally.", 10, "blue");
    private final SkillM python = new SkillM( "Python", "Python lang.", 10, "green");

    @Override
    public void run(String... args) {
        if (skillsRepo.count() == 0) { // Only insert if the database is empty
            List<SkillM> skills = List.of(aws, java, dotnet, azure, python);

            skillsRepo.saveAll(skills);
            System.out.println("✅ Predefined skills inserted into MongoDB!");
        } else {
            System.out.println("✅ Skills data already exists. Skipping seeding.");
        }
    }
}