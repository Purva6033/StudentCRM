package com.purva.studentcrm.dto;

public class LeadRequest {

    private String studentName;
    private String email;
    private String phone;
    private String courseInterested;
    private String source;
    private String status;
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getCourseInterested() {
		return courseInterested;
	}
	public void setCourseInterested(String courseInterested) {
		this.courseInterested = courseInterested;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

    // Getters and Setters
}