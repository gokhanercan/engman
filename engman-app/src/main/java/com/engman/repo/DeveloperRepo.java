package com.engman.repo;
//import com.engman.entity.Developer;
import com.engman.models.DeveloperM;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DeveloperRepo extends MongoRepository<DeveloperM, String> {
    //DeveloperM findByName(String name);

//    ref:https://docs.spring.io/spring-data/mongodb/reference/mongodb/repositories/modifying-methods.html
//    @Modifying
    @Update("{ '$set': { 'age': ?1 } }")
    @Query("{ 'id': ?0 }")
    void age(UUID id, Integer age);
}
