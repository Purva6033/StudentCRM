package com.purva.studentcrm.controller;
import com.purva.studentcrm.dto.LoginResponse;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import com.purva.studentcrm.dto.LoginRequest;
import com.purva.studentcrm.dto.RegisterRequest;
import com.purva.studentcrm.entity.User;
import com.purva.studentcrm.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService service;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return service.login(request);
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return service.register(request);
    }

    @GetMapping("/resetAdmin")
    public String resetAdmin() {
        return service.resetAdminPassword();
    }

    @GetMapping("/resetCounselor")
    public String resetCounselor() {
        return service.resetCounselorPassword();
    }

    @GetMapping("/resetStudent")
    public String resetStudent() {
        return service.resetStudentPassword();
    }
}