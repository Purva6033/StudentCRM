package com.purva.studentcrm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.purva.studentcrm.entity.ActivityLog;
import com.purva.studentcrm.service.ActivityLogService;

@RestController
@RequestMapping("/activity")
@CrossOrigin(origins = "http://localhost:5173")
public class ActivityLogController {

    @Autowired
    private ActivityLogService service;

    @GetMapping("/all")
    public List<ActivityLog> getAllLogs() {

        return service.getAllLogs();

    }

}