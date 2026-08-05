package com.purva.studentcrm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.purva.studentcrm.dto.CourseRequest;
import com.purva.studentcrm.entity.Course;
import com.purva.studentcrm.service.CourseService;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseService service;

    // Save Course
    @PostMapping("/save")
    public ResponseEntity<Course> saveCourse(@RequestBody CourseRequest request) {

        return new ResponseEntity<>(service.saveCourse(request), HttpStatus.CREATED);
    }

    // Get All Courses
    @GetMapping("/all")
    public ResponseEntity<List<Course>> getAllCourses() {

        return ResponseEntity.ok(service.getAllCourses());
    }

    // Get Course By Id
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Integer id) {

        return ResponseEntity.ok(service.getCourseById(id));
    }

    // Update Course
    @PutMapping("/update/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Integer id,
                                               @RequestBody CourseRequest request) {

        return ResponseEntity.ok(service.updateCourse(id, request));
    }

    // Delete Course
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Integer id) {

        return ResponseEntity.ok(service.deleteCourse(id));
    }
    
    //search course
    @GetMapping("/search")
    public ResponseEntity<List<Course>> searchCourses(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                service.searchCourses(keyword));
    }
}