package com.purva.studentcrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.purva.studentcrm.dto.LeadStatusReportDTO;
import com.purva.studentcrm.entity.Lead;

public interface LeadRepository extends JpaRepository<Lead, Integer> {

    @Query("""
        SELECT l FROM Lead l
        WHERE LOWER(l.studentName) LIKE LOWER(CONCAT('%', ?1, '%'))
           OR LOWER(l.email) LIKE LOWER(CONCAT('%', ?1, '%'))
           OR l.phone LIKE CONCAT('%', ?1, '%')
    """)
    List<Lead> searchLeads(String keyword);

    List<Lead> findByCounselorUserId(Integer userId);

    long countByCounselorUserId(Integer userId);

    long countByCounselorUserIdAndStatus(
            Integer userId,
            String status
    );

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);
    

    @Query("""
    		SELECT COUNT(l)
    		FROM Lead l
    		WHERE l.counselor.userId = :userId
    		AND l.status IN (
    		'NEW_ENQUIRY',
    		'CONTACTED',
    		'INTERESTED',
    		'DEMO_SCHEDULED',
    		'FOLLOW_UP'
    		)
    		""")
    		long countPendingLeads(Integer userId);
    
    @Query("""
    		SELECT new com.purva.studentcrm.dto.LeadStatusReportDTO(
    		l.status,
    		COUNT(l)
    		)
    		FROM Lead l
    		GROUP BY l.status
    		ORDER BY COUNT(l) DESC
    		""")
    		List<LeadStatusReportDTO> getLeadStatusReport();
    
    
}