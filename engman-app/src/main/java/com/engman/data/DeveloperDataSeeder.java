package com.engman.data;

import com.engman.repo.DeveloperRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DeveloperDataSeeder implements CommandLineRunner {

    private final DeveloperRepo devRepo;
    public DeveloperDataSeeder(DeveloperRepo devRepo) {
        this.devRepo = devRepo;
    }

    @Override
    public void run(String... args) {
        if (devRepo.count() == 0) {
            devRepo.saveAll(InitialData.Devs);
            System.out.println("✅ Predefined Developers inserted into MongoDB!");
        } else {
            System.out.println("✅ Developers data already exists. Skipping seeding.");
        }
    }
}