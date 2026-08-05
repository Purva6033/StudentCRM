package com.purva.studentcrm.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purva.studentcrm.entity.FollowUp;

public interface FollowUpRepository extends JpaRepository<FollowUp, Integer> {

    List<FollowUp> findByLeadCounselorUserId(Integer userId);

    long countByLeadCounselorUserId(Integer userId);

    long countByFollowUpDate(LocalDate followUpDate);

    long countByFollowUpDateBeforeAndStatus(
            LocalDate date,
            String status
    );

}