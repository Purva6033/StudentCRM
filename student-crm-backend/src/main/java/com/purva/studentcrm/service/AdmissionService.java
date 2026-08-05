package com.purva.studentcrm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.purva.studentcrm.dto.AdmissionRequest;
import com.purva.studentcrm.entity.Admission;
import com.purva.studentcrm.entity.Course;
import com.purva.studentcrm.entity.Lead;
import com.purva.studentcrm.entity.Student;
import com.purva.studentcrm.entity.User;
import com.purva.studentcrm.enums.AdmissionStatus;
import com.purva.studentcrm.enums.Role;
import com.purva.studentcrm.enums.StudentStatus;
import com.purva.studentcrm.exception.ResourceNotFoundException;
import com.purva.studentcrm.repository.AdmissionRepository;
import com.purva.studentcrm.repository.CourseRepository;
import com.purva.studentcrm.repository.LeadRepository;
import com.purva.studentcrm.repository.StudentRepository;
import com.purva.studentcrm.repository.UserRepository;

@Service
public class AdmissionService {

    @Autowired
    private AdmissionRepository admissionRepository;

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Admission saveAdmission(AdmissionRequest request) {

        Lead lead = leadRepository.findById(request.getLeadId())
                .orElseThrow(() -> new RuntimeException("Lead Not Found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course Not Found"));

        User counselor = userRepository.findById(request.getCounselorId())
                .orElseThrow(() -> new RuntimeException("Counselor Not Found"));

        Admission admission = new Admission();

        admission.setLead(lead);
        admission.setCourse(course);
        admission.setCounselor(counselor);
        admission.setAdmissionDate(request.getAdmissionDate());
        admission.setStatus(request.getStatus());

        return admissionRepository.save(admission);
    }

    public List<Admission> getAllAdmissions() {
        return admissionRepository.findAll();
    }

    public Admission getAdmissionById(Integer id) {
        return admissionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admission not found with ID : " + id));
    }

    public Admission updateAdmission(Integer id, AdmissionRequest request) {

        Admission admission = admissionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admission not found with ID : " + id));

        Lead lead = leadRepository.findById(request.getLeadId())
                .orElseThrow(() -> new RuntimeException("Lead Not Found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course Not Found"));

        User counselor = userRepository.findById(request.getCounselorId())
                .orElseThrow(() -> new RuntimeException("Counselor Not Found"));

        admission.setLead(lead);
        admission.setCourse(course);
        admission.setCounselor(counselor);
        admission.setAdmissionDate(request.getAdmissionDate());
        admission.setStatus(request.getStatus());

        return admissionRepository.save(admission);
    }

    public String deleteAdmission(Integer id) {

        Admission admission = admissionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admission not found with ID : " + id));

        admissionRepository.delete(admission);

        return "Admission Deleted Successfully";
    }

    public List<Admission> searchAdmissions(String keyword) {

        try {
            AdmissionStatus status =
                    AdmissionStatus.valueOf(keyword.trim().toUpperCase());

            return admissionRepository.findByStatus(status);

        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }

    public List<Admission> getAvailableAdmissions() {
        return admissionRepository.getAvailableAdmissions();
    }

    public Admission approveAdmission(Integer id) {

        Admission admission = admissionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admission not found"));

        if (admission.getStatus() == AdmissionStatus.APPROVED) {
            return admission;
        }

        admission.setStatus(AdmissionStatus.APPROVED);

        Admission savedAdmission = admissionRepository.save(admission);

        Lead lead = savedAdmission.getLead();

     // ---------- Create or Update Student ----------

        Student student;

        if (studentRepository.findByEmail(lead.getEmail()).isPresent()) {

            // Existing student
            student = studentRepository.findByEmail(lead.getEmail()).get();

        } else {

            // New student
            student = new Student();

            student.setStudentName(lead.getStudentName());
            student.setEmail(lead.getEmail());
            student.setPhone(lead.getPhone());
            student.setAddress("");
        }

        // Link admission details
        student.setAdmission(savedAdmission);
        student.setAdmissionDate(savedAdmission.getAdmissionDate());
        student.setCourse(savedAdmission.getCourse());
        student.setStatus(StudentStatus.ACTIVE);

        student = studentRepository.save(student);

        // Generate student code only once
        if (student.getStudentCode() == null) {

            student.setStudentCode(
                    String.format("STU%03d", student.getStudentId()));

            studentRepository.save(student);
        }
        // Create Login
        if (userRepository.findByEmail(lead.getEmail()).isEmpty()) {

            User user = new User();

            user.setUsername(lead.getEmail());
            user.setFullName(lead.getStudentName());
            user.setEmail(lead.getEmail());
            user.setPhone(lead.getPhone());
            user.setPassword(passwordEncoder.encode("student123"));
            user.setRole(Role.STUDENT);
            user.setIsActive(true);

            userRepository.save(user);
        }

        return savedAdmission;
    }
}