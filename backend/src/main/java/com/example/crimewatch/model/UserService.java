package com.example.crimewatch.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class UserService {
    @Id
    private String id;
    private String fullName;
    private String email;
    private String phone;
    private String password;
}
