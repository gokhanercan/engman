package com.engman.repo;
//import com.engman.entity.Developer;
import com.engman.models.DeveloperM;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeveloperRepo extends MongoRepository<DeveloperM, String> {
    //DeveloperM findByName(String name);
}
