package com.purva.studentcrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.purva.studentcrm.entity.Lead;

public interface LeadRepository extends JpaRepository<Lead, Integer> {

    @Query("""
        SELECT l FROM Lead l
        WHERE LOWER(l.studentName) LIKE LOWER(CONCAT('%', ?1, '%'))
           OR LOWER(l.email) LIKE LOWER(CONCAT('%', ?1, '%'))
           OR l.phone LIKE CONCAT('%', ?1, '%')
    """)
    List<Lead> searchLeads(String keyword);

}