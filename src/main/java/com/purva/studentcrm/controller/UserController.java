package com.purva.studentcrm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.purva.studentcrm.entity.User;
import com.purva.studentcrm.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }
    @GetMapping("/counselors")
    public List<User> getAllCounselors() {
        return service.getAllCounselors();
    }
}