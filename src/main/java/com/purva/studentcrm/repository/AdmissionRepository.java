package com.purva.studentcrm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.purva.studentcrm.entity.Admission;
import com.purva.studentcrm.entity.Student;
import com.purva.studentcrm.enums.AdmissionStatus;

public interface AdmissionRepository extends JpaRepository<Admission, Integer> {

    // Search by exact enum status
    List<Admission> findByStatus(AdmissionStatus status);

    // Find admission by student
    Optional<Admission> findByStudent(Student student);

    // Approved admissions not yet assigned to a student
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

    // Recent admissions
    @Query("""
            SELECT a
            FROM Admission a
            ORDER BY a.admissionDate DESC
            """)
    List<Admission> getRecentAdmissions();
}