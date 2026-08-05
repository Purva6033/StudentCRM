package com.purva.studentcrm.dto;

public class CourseReportDTO {

    private String courseName;
    private Long total;

    public CourseReportDTO(String courseName, Long total) {
        this.courseName = courseName;
        this.total = total;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
