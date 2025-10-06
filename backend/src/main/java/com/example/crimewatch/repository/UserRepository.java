package com.example.crimewatch.repository;

import com.example.crimewatch.model.UserService;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserService, String> {
    Optional<UserService> findByEmail(String email);
}