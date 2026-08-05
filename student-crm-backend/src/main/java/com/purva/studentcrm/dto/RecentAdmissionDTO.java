package com.purva.studentcrm.dto;

import com.purva.studentcrm.enums.AdmissionStatus;

public class RecentAdmissionDTO {

    private Integer admissionId;
    private String studentName;
    private String courseName;
    private String counselorName;
    private AdmissionStatus status;

    public RecentAdmissionDTO() {
    }

    public Integer getAdmissionId() {
        return admissionId;
    }

    public void setAdmissionId(Integer admissionId) {
        this.admissionId = admissionId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCounselorName() {
        return counselorName;
    }

    public void setCounselorName(String counselorName) {
        this.counselorName = counselorName;
    }

    public AdmissionStatus getStatus() {
        return status;
    }

    public void setStatus(AdmissionStatus admissionStatus) {
        this.status = admissionStatus;
    }
}