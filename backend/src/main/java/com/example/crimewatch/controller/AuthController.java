package com.example.crimewatch.controller;

import com.example.crimewatch.model.User;
import com.example.crimewatch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173") // Vite default port
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        boolean success = userService.authenticate(user.getEmail(), user.getPassword());
        return success ? "Login successful" : "Invalid credentials";
    }
}
