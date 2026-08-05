package com.purva.studentcrm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.purva.studentcrm.dto.StudentProfileResponse;
import com.purva.studentcrm.dto.StudentProfileUpdateRequest;
import com.purva.studentcrm.dto.StudentRequest;
import com.purva.studentcrm.entity.Admission;
import com.purva.studentcrm.entity.Course;
import com.purva.studentcrm.entity.Student;
import com.purva.studentcrm.enums.StudentStatus;
import com.purva.studentcrm.exception.ResourceNotFoundException;
import com.purva.studentcrm.exception.StudentNotFoundException;
import com.purva.studentcrm.repository.AdmissionRepository;
import com.purva.studentcrm.repository.CourseRepository;
import com.purva.studentcrm.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    @Autowired
    private AdmissionRepository admissionRepository;

    @Autowired
    private CourseRepository courseRepository;

    // ===================== Student Profile =====================

    public StudentProfileResponse getProfile(String email) {

        Student student = repository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));

        Admission admission = student.getAdmission();

        return new StudentProfileResponse(

                student.getStudentName(),

                student.getStudentCode(),

                student.getCourse() != null
                        ? student.getCourse().getCourseName()
                        : "",

                student.getAdmissionDate() != null
                        ? student.getAdmissionDate().toString()
                        : "",

                        student.getStatus() != null
                        ? student.getStatus().name()
                        : "",

                admission != null && admission.getCounselor() != null
                        ? admission.getCounselor().getFullName()
                        : "",

                student.getPhone(),

                student.getAddress()
        );
    }

    // ===================== Update Student Profile =====================

    public void updateProfile(StudentProfileUpdateRequest request) {

        Student student = repository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));

        student.setPhone(request.getPhone());
        student.setAddress(request.getAddress());

        repository.save(student);
    }

    // ===================== Search Student =====================

    public List<Student> searchStudents(String keyword) {
        return repository.searchStudents(keyword);
    }

    // ===================== Generate Student Code =====================

    private String generateStudentCode() {

        long count = repository.count() + 1;

        return String.format("STU%03d", count);
    }

    // ===================== Save Student =====================

    public Student saveStudent(StudentRequest request) {

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course Not Found"));

        Student student = new Student();

        student.setStudentName(request.getStudentName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());
        student.setAddress(request.getAddress());
        student.setStatus(StudentStatus.valueOf(request.getStatus().toUpperCase()));
        student.setCourse(course);

        Student savedStudent = repository.save(student);

        savedStudent.setStudentCode(
                String.format("STU%03d", savedStudent.getStudentId())
        );

        return repository.save(savedStudent);
    }

    // ===================== Get All Students =====================

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    // ===================== Get Student By ID =====================

    public Student getStudentById(Integer id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with ID : " + id));
    }

    // ===================== Update Student =====================

    public Student updateStudent(Integer id, StudentRequest request) {

        Student student = repository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Student not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() ->
                        new RuntimeException("Course not found"));

        student.setStudentName(request.getStudentName());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());
        student.setAddress(request.getAddress());
        student.setStatus(StudentStatus.valueOf(request.getStatus().toUpperCase()));
        student.setCourse(course);

        return repository.save(student);
    }

    // ===================== Delete Student =====================

    public String deleteStudent(Integer id) {

        if (repository.existsById(id)) {

            repository.deleteById(id);

            return "Student deleted successfully.";
        }

        return "Student not found.";
    }

    // ===================== Pagination =====================

    public Page<Student> getStudents(Pageable pageable) {

        return repository.findAll(pageable);
    }

    // ===================== Available Admissions =====================

    public List<Admission> getAvailableAdmissions() {

        return admissionRepository.getAvailableAdmissions();
    }
}