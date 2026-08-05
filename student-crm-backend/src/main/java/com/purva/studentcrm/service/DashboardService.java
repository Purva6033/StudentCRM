package com.purva.studentcrm.service;

import java.util.ArrayList;

import java.util.List;
import com.purva.studentcrm.dto.CounselorPerformanceDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.purva.studentcrm.dto.CourseReportDTO;
import com.purva.studentcrm.dto.DashboardResponse;
import com.purva.studentcrm.dto.LeadStatusReportDTO;
import com.purva.studentcrm.dto.RecentAdmissionDTO;
import com.purva.studentcrm.entity.Student;
import com.purva.studentcrm.repository.AdmissionRepository;
import com.purva.studentcrm.repository.CourseRepository;
import com.purva.studentcrm.repository.FollowUpRepository;
import com.purva.studentcrm.repository.LeadRepository;
import com.purva.studentcrm.repository.StudentRepository;
import com.purva.studentcrm.repository.UserRepository;
import java.time.LocalDate;
import com.purva.studentcrm.dto.MonthlyAdmissionDTO;
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
        dashboard.setTodayFollowUps(
                followUpRepository.countByFollowUpDate(LocalDate.now())
        );

        dashboard.setOverdueFollowUps(
                followUpRepository.countByFollowUpDateBeforeAndStatus(
                        LocalDate.now(),
                        "Pending"
                )
        );

        
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

    public List<LeadStatusReportDTO> getLeadStatusReport() {

        return leadRepository.getLeadStatusReport();

    }
    public List<CourseReportDTO> getCourseReport() {

        return courseRepository.getCourseReport();

    }
    public List<CounselorPerformanceDTO> getCounselorPerformance() {
        return admissionRepository.getCounselorPerformance();
    }
    
    public List<MonthlyAdmissionDTO> getMonthlyAdmissions() {

        List<Object[]> rows = admissionRepository.getMonthlyAdmissions();

        List<MonthlyAdmissionDTO> list = new ArrayList<>();

        for (Object[] row : rows) {

            list.add(

                new MonthlyAdmissionDTO(

                    row[0].toString(),

                    ((Number) row[1]).longValue()

                )

            );

        }

        return list;

    }
      
}