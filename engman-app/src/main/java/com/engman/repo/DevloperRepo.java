package com.engman.repo;
import com.engman.entity.Developer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DevloperRepo extends MongoRepository<Developer, String> {
    Developer findByName(String name);

}
