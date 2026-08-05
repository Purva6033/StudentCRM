package com.purva.studentcrm.controller;
import com.purva.studentcrm.dto.LoginResponse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.purva.studentcrm.dto.GenerateOtpRequest;
import com.purva.studentcrm.dto.VerifyOtpRequest;
import com.purva.studentcrm.dto.ResetPasswordRequest;
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
    
 // ================= PENDING STUDENTS =================

    @GetMapping("/pending")
    public List<User> getPendingStudents() {

        return service.getPendingStudents();

    }

    // ================= APPROVE =================

    @PutMapping("/approve/{id}")
    public String approveStudent(
            @PathVariable Integer id) {

        return service.approveStudent(id);

    }

    // ================= REJECT =================

    @PutMapping("/reject/{id}")
    public String rejectStudent(
            @PathVariable Integer id) {

        return service.rejectStudent(id);

    }
    
    @PostMapping("/generate-otp")
    public ResponseEntity<String> generateOtp(
            @RequestBody GenerateOtpRequest request) {

        return ResponseEntity.ok(
                service.generateOtp(request.getEmail()));

    }
    
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @RequestBody VerifyOtpRequest request) {

        return ResponseEntity.ok(

                service.verifyOtp(

                        request.getEmail(),

                        request.getOtp()

                )

        );

    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        return ResponseEntity.ok(

                service.resetPassword(

                        request.getEmail(),

                        request.getNewPassword()

                )

        );

    }
}