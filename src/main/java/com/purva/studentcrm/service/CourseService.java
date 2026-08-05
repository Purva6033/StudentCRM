package com.purva.studentcrm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.purva.studentcrm.dto.CourseRequest;
import com.purva.studentcrm.entity.Course;
import com.purva.studentcrm.repository.CourseRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository repository;
    public List<Course> searchCourses(String keyword) {
        return repository.searchCourses(keyword);
    }

    // Save Course
    public Course saveCourse(CourseRequest request) {

        Course course = new Course();

        course.setCourseName(request.getCourseName());
        course.setDuration(request.getDuration());
        course.setFees(request.getFees());
        course.setDescription(request.getDescription());
        course.setIsActive(request.getIsActive());
        course.setCourseCode(request.getCourseCode());
        return repository.save(course);
    }

    // Get All Courses
    public List<Course> getAllCourses() {
        return repository.findAll();
    }

    // Get Course By Id
    public Course getCourseById(Integer id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course Not Found"));
    }

    // Update Course
    public Course updateCourse(Integer id, CourseRequest request) {

        Course course = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course Not Found"));

        course.setCourseName(request.getCourseName());
        course.setDuration(request.getDuration());
        course.setFees(request.getFees());
        course.setDescription(request.getDescription());
        course.setIsActive(request.getIsActive());
        course.setCourseCode(request.getCourseCode());

        return repository.save(course);
    }

    // Delete Course
    public String deleteCourse(Integer id) {

        Course course = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course Not Found"));

        repository.delete(course);

        return "Course Deleted Successfully";
        
    }
    
}