package com.purva.studentcrm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.purva.studentcrm.dto.CourseReportDTO;
import com.purva.studentcrm.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    @Query("""
            SELECT c FROM Course c
            WHERE LOWER(c.courseName) LIKE LOWER(CONCAT('%', ?1, '%'))
               OR LOWER(c.courseCode) LIKE LOWER(CONCAT('%', ?1, '%'))
            """)
    List<Course> searchCourses(String keyword);

    @Query("""
            SELECT new com.purva.studentcrm.dto.CourseReportDTO(
                c.courseName,
                COUNT(a)
            )
            FROM Course c
            LEFT JOIN Admission a
                ON a.course.courseId = c.courseId
            GROUP BY c.courseName
            ORDER BY COUNT(a) DESC
            """)
    List<CourseReportDTO> getCourseReport();

}