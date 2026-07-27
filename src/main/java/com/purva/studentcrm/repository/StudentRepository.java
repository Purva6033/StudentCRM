package com.purva.studentcrm.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.purva.studentcrm.entity.Student;
import java.util.Optional;


public interface StudentRepository extends JpaRepository<Student, Integer> {
	Optional<Student> findByEmail(String email);

    @Query("""
            SELECT s
            FROM Student s
            WHERE LOWER(s.studentName) LIKE LOWER(CONCAT('%',:keyword,'%'))
               OR LOWER(s.studentCode) LIKE LOWER(CONCAT('%',:keyword,'%'))
               OR LOWER(s.email) LIKE LOWER(CONCAT('%',:keyword,'%'))
            """)
    java.util.List<Student> searchStudents(String keyword);

    
    @Query("""
    	       SELECT s
    	       FROM Student s
    	       WHERE s.admission IS NOT NULL
    	       ORDER BY s.admissionDate DESC
    	       """)
    	List<Student> getRecentStudents();

}