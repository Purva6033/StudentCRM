package com.purva.studentcrm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.purva.studentcrm.dto.LoginRequest;
import com.purva.studentcrm.dto.LoginResponse;
import com.purva.studentcrm.dto.RegisterRequest;
import com.purva.studentcrm.entity.User;
import com.purva.studentcrm.enums.Role;
import com.purva.studentcrm.repository.UserRepository;
import com.purva.studentcrm.security.JwtUtil;

@Service
public class UserService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ================= REGISTER =================

    public User register(RegisterRequest request) {

        User user = new User();

        user.setUsername(request.getUsername());
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setIsActive(true);

        return repository.save(user);
    }

    // ================= LOGIN =================

    public LoginResponse login(LoginRequest request) {

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "Invalid Email or Password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid Email or Password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                user.getEmail(),
                user.getRole().name());
    }

    // ================= RESET ADMIN PASSWORD =================

    public String resetAdminPassword() {

        User user = repository.findByEmail("admin@crm.com")
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Admin not found"));

        user.setPassword(passwordEncoder.encode("admin123"));

        repository.save(user);

        return "Password Updated Successfully";
    }

    // ================= RESET COUNSELOR PASSWORD =================

    public String resetCounselorPassword() {

        User user = repository.findByEmail("counselor@gmail.com")
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Counselor not found"));

        user.setPassword(passwordEncoder.encode("counselor123"));

        repository.save(user);

        return "Password Reset Successfully";
    }

    public String resetStudentPassword() {

        User user = repository.findByEmail("riya@gmail.com")
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found"
                ));

        user.setPassword(passwordEncoder.encode("student123"));

        repository.save(user);

        return "Student Password Reset Successfully";
    }
    // ================= USERS =================

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public List<User> getAllCounselors() {
        return repository.findByRole(Role.COUNSELOR);
    }

    public JwtUtil getJwtUtil() {
        return jwtUtil;
    }

    public void setJwtUtil(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
}