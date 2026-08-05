package com.purva.studentcrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purva.studentcrm.entity.CallRecord;

public interface CallRecordRepository extends JpaRepository<CallRecord, Integer> {

    List<CallRecord> findByCallStatusContainingIgnoreCase(String status);

}