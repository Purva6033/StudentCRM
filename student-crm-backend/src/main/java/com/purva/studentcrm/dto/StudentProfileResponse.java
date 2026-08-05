package com.purva.studentcrm.dto;

public class StudentProfileResponse {

    private String studentName;
    private String studentCode;
    private String course;
    private String admissionDate;
    private String status;
    private String counselor;

    private String phone;
    private String address;

    public StudentProfileResponse() {
    }

    public StudentProfileResponse(
            String studentName,
            String studentCode,
            String course,
            String admissionDate,
            String status,
            String counselor,
            String phone,
            String address) {

        this.studentName = studentName;
        this.studentCode = studentCode;
        this.course = course;
        this.admissionDate = admissionDate;
        this.status = status;
        this.counselor = counselor;
        this.phone = phone;
        this.address = address;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentCode() {
        return studentCode;
    }

    public void setStudentCode(String studentCode) {
        this.studentCode = studentCode;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(String admissionDate) {
        this.admissionDate = admissionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCounselor() {
        return counselor;
    }

    public void setCounselor(String counselor) {
        this.counselor = counselor;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}