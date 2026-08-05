package com.purva.studentcrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purva.studentcrm.entity.ActivityLog;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Integer> {

    List<ActivityLog> findAllByOrderByTimestampDesc();

}