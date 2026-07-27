package com.purva.studentcrm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.purva.studentcrm.dto.StudentProfileResponse;
import com.purva.studentcrm.dto.StudentRequest;
import com.purva.studentcrm.entity.Admission;
import com.purva.studentcrm.entity.Student;
import com.purva.studentcrm.service.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService service;

    // Save Student
    @PostMapping("/save")
    public ResponseEntity<Student> saveStudent(@Valid @RequestBody StudentRequest request) {

        Student savedStudent = service.saveStudent(request);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    // Get Student Profile
    @GetMapping("/profile")
    public ResponseEntity<StudentProfileResponse> getProfile(
            @RequestParam String email) {

        return ResponseEntity.ok(service.getProfile(email));
    }
    
   
    // Available Admissions
    @GetMapping("/available")
    public ResponseEntity<List<Admission>> getAvailableAdmissions() {
        return ResponseEntity.ok(service.getAvailableAdmissions());
    }

    // Get All Students
    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(service.getAllStudents());
    }

    // Get Student By ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getStudentById(id));
    }

    // Update Student
    @PutMapping("/update/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Integer id,
            @Valid @RequestBody StudentRequest request) {

        return ResponseEntity.ok(service.updateStudent(id, request));
    }

    // Delete Student
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Integer id) {

        return ResponseEntity.ok(service.deleteStudent(id));
    }

    // Search Students
    @GetMapping("/search")
    public ResponseEntity<List<Student>> searchStudents(
            @RequestParam String keyword) {

        return ResponseEntity.ok(service.searchStudents(keyword));
    }

    // Pagination
    @GetMapping("/page")
    public ResponseEntity<Page<Student>> getAllStudents(Pageable pageable) {

        return ResponseEntity.ok(service.getStudents(pageable));
    }

}