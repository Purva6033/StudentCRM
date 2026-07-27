package com.purva.studentcrm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.purva.studentcrm.dto.StudentProfileResponse;
import com.purva.studentcrm.dto.StudentRequest;
import com.purva.studentcrm.entity.Admission;
import com.purva.studentcrm.entity.Course;
import com.purva.studentcrm.repository.AdmissionRepository;
import com.purva.studentcrm.repository.CourseRepository;
import com.purva.studentcrm.entity.Student;
import com.purva.studentcrm.exception.ResourceNotFoundException;
import com.purva.studentcrm.exception.StudentNotFoundException;
import com.purva.studentcrm.repository.StudentRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;



@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    @Autowired
    private AdmissionRepository admissionRepository;

    @Autowired
    private CourseRepository courseRepository;
    
    public StudentProfileResponse getProfile(String email) {

        Student student = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Admission admission = student.getAdmission();

        return new StudentProfileResponse(
                student.getStudentName(),
                student.getStudentCode(),
                student.getCourse() != null ? student.getCourse().getCourseName() : "",
                student.getAdmissionDate() != null ? student.getAdmissionDate().toString() : "",
                student.getStatus(),
                admission != null && admission.getCounselor() != null
                        ? admission.getCounselor().getFullName()
                        : ""
        );
    }
    
    //search
    public List<Student> searchStudents(String keyword) {
        return repository.searchStudents(keyword);	
    }
    
    private String generateStudentCode() {

        long count = repository.count() + 1;

        return String.format("STU%03d", count);
    }
    
    //save student
    public Student saveStudent(StudentRequest request) {

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course Not Found"));

       
        Student student = new Student();

        student.setStudentName(request.getStudentName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());
        student.setAddress(request.getAddress());
        student.setStatus(request.getStatus());

        student.setCourse(course);
       

        // Save first to generate the ID
        Student savedStudent = repository.save(student);

        // Generate the student code
        savedStudent.setStudentCode(
                String.format("STU%03d", savedStudent.getStudentId())
        );

        // Save again with the generated code
        return repository.save(savedStudent);
    }

    // Get All Students
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student getStudentById(Integer id) {

        return repository.findById(id)
        		.orElseThrow(() ->
                new ResourceNotFoundException(
                        "Student not found with ID : " + id));
    }
 // Update Student
    public Student updateStudent(Integer id, StudentRequest request) {

        Student student = repository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Student not found"));


        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

      
        student.setStudentName(request.getStudentName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());
        student.setAddress(request.getAddress());
   
        student.setStatus(request.getStatus());

        student.setCourse(course);

        return repository.save(student);
    }
 // Delete Student
    public String deleteStudent(Integer id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Student deleted successfully.";
        }

        return "Student not found.";
    }
    
    public Page<Student> getStudents(Pageable pageable) {
        return repository.findAll(pageable);
    }
    public List<Admission> getAvailableAdmissions() {
        return admissionRepository.getAvailableAdmissions();
    }
}