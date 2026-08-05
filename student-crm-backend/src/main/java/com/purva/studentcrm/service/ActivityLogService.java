package com.purva.studentcrm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.purva.studentcrm.entity.ActivityLog;
import com.purva.studentcrm.repository.ActivityLogRepository;

@Service
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository repository;

    public List<ActivityLog> getAllLogs() {

        return repository.findAllByOrderByTimestampDesc();

    }

}