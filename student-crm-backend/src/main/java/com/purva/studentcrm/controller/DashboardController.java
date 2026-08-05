package com.purva.studentcrm.controller;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.purva.studentcrm.dto.CounselorPerformanceDTO;
import com.purva.studentcrm.dto.DashboardResponse;
import com.purva.studentcrm.dto.LeadStatusReportDTO;
import com.purva.studentcrm.dto.MonthlyAdmissionDTO;
import com.purva.studentcrm.dto.RecentAdmissionDTO;
import com.purva.studentcrm.service.DashboardService;
import java.util.List;
import com.purva.studentcrm.dto.CourseReportDTO;
@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService service;

    @GetMapping("/stats")
    public ResponseEntity<DashboardResponse> getDashboardStats() {

        return ResponseEntity.ok(service.getDashboardStats());
    }
    @GetMapping("/recent-admissions")
    public ResponseEntity<List<RecentAdmissionDTO>> getRecentAdmissions() {
        return ResponseEntity.ok(service.getRecentAdmissions());
    }
    
    @GetMapping("/lead-status")
    public ResponseEntity<List<LeadStatusReportDTO>> getLeadStatusReport(){

        return ResponseEntity.ok(
                service.getLeadStatusReport());

    }
    
    @GetMapping("/course-report")
    public ResponseEntity<List<CourseReportDTO>> getCourseReport(){

        return ResponseEntity.ok(
                service.getCourseReport());

    }
    
    @GetMapping("/counselor-performance")
    public ResponseEntity<List<CounselorPerformanceDTO>> getCounselorPerformance() {
        return ResponseEntity.ok(service.getCounselorPerformance());
    }
    
    @GetMapping("/monthly-admissions")
    public ResponseEntity<List<MonthlyAdmissionDTO>> getMonthlyAdmissions() {
        return ResponseEntity.ok(service.getMonthlyAdmissions());
    }
}