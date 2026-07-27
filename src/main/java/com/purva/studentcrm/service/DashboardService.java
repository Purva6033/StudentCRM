package com.purva.studentcrm.service;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.purva.studentcrm.dto.DashboardResponse;
import com.purva.studentcrm.dto.RecentAdmissionDTO;
import com.purva.studentcrm.entity.Student;
import com.purva.studentcrm.repository.AdmissionRepository;
import com.purva.studentcrm.repository.CourseRepository;
import com.purva.studentcrm.repository.FollowUpRepository;
import com.purva.studentcrm.repository.LeadRepository;
import com.purva.studentcrm.repository.StudentRepository;
import com.purva.studentcrm.repository.UserRepository;

@Service
public class DashboardService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private AdmissionRepository admissionRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FollowUpRepository followUpRepository;

    public DashboardResponse getDashboardStats() {

        DashboardResponse dashboard = new DashboardResponse();

        dashboard.setTotalStudents(studentRepository.count());
        dashboard.setTotalLeads(leadRepository.count());
        dashboard.setTotalAdmissions(admissionRepository.count());
        dashboard.setTotalCourses(courseRepository.count());
        dashboard.setTotalCounselors(userRepository.count());
        dashboard.setTotalFollowUps(followUpRepository.count());

        
        return dashboard;
        
    }
    public List<RecentAdmissionDTO> getRecentAdmissions() {

        List<RecentAdmissionDTO> list = new ArrayList<>();

        List<Student> students = studentRepository.getRecentStudents();

        for (Student student : students) {

            RecentAdmissionDTO dto = new RecentAdmissionDTO();

            dto.setAdmissionId(student.getAdmission().getAdmissionId());
            dto.setStudentName(student.getStudentName());
            dto.setCourseName(student.getCourse().getCourseName());
            dto.setCounselorName(student.getAdmission().getCounselor().getFullName());
            dto.setStatus(student.getAdmission().getStatus());

            list.add(dto);
        }

        return list;
    }

      
}