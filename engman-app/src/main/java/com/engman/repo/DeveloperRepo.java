package com.engman.repo;
import com.engman.entity.Developer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

public interface DeveloperRepo extends MongoRepository<Developer, String> {
    Developer findByName(String name);

}
