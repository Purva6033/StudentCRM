package com.purva.studentcrm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.purva.studentcrm.dto.CounselorPerformanceDTO;
import com.purva.studentcrm.entity.Admission;
import com.purva.studentcrm.entity.Student;
import com.purva.studentcrm.enums.AdmissionStatus;

public interface AdmissionRepository extends JpaRepository<Admission, Integer> {

    // Search by Status
    List<Admission> findByStatus(AdmissionStatus status);

    // Find Admission by Student
    Optional<Admission> findByStudent(Student student);

    // Approved Admissions
    @Query("""
            SELECT a
            FROM Admission a
            WHERE a.status = com.purva.studentcrm.enums.AdmissionStatus.APPROVED
            AND a.admissionId NOT IN (
                SELECT s.admission.admissionId
                FROM Student s
                WHERE s.admission IS NOT NULL
            )
            """)
    List<Admission> getAvailableAdmissions();

    // Recent Admissions
    @Query("""
            SELECT a
            FROM Admission a
            ORDER BY a.admissionDate DESC
            """)
    List<Admission> getRecentAdmissions();

    // Counselor Performance
    @Query("""
            SELECT new com.purva.studentcrm.dto.CounselorPerformanceDTO(
                a.counselor.fullName,
                COUNT(a)
            )
            FROM Admission a
            GROUP BY a.counselor.fullName
            ORDER BY COUNT(a) DESC
            """)
    List<CounselorPerformanceDTO> getCounselorPerformance();

    // Monthly Admissions
    @Query(value = """
            SELECT
                DATE_FORMAT(admission_date,'%b') AS month,
                COUNT(*) AS total
            FROM admissions
            GROUP BY MONTH(admission_date),
                     DATE_FORMAT(admission_date,'%b')
            ORDER BY MONTH(admission_date)
            """, nativeQuery = true)
    List<Object[]> getMonthlyAdmissions();

    // Count by Counselor
    long countByCounselorUserId(Integer userId);

}