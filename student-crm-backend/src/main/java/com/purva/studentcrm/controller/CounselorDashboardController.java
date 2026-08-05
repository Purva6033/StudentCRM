package com.purva.studentcrm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.purva.studentcrm.dto.CounselorDashboardResponse;
import com.purva.studentcrm.service.CounselorDashboardService;

@RestController
@RequestMapping("/counselor")
@CrossOrigin(origins = "http://localhost:5173")
public class CounselorDashboardController {

    @Autowired
    private CounselorDashboardService service;

    @GetMapping("/dashboard")
    public CounselorDashboardResponse dashboard(
            @RequestParam String email) {

        return service.getDashboard(email);
    }
}