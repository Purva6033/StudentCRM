package com.purva.studentcrm.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.purva.studentcrm.dto.DashboardResponse;
import com.purva.studentcrm.dto.RecentAdmissionDTO;
import com.purva.studentcrm.service.DashboardService;
import java.util.List;

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
}