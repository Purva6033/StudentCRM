package com.purva.studentcrm.dto;

public class DashboardResponse {

    private long totalStudents;
    private long totalLeads;
    private long totalAdmissions;
    private long totalCourses;
    private long totalCounselors;
    private long totalFollowUps;

    public DashboardResponse() {
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getTotalLeads() {
        return totalLeads;
    }

    public void setTotalLeads(long totalLeads) {
        this.totalLeads = totalLeads;
    }

    public long getTotalAdmissions() {
        return totalAdmissions;
    }

    public void setTotalAdmissions(long totalAdmissions) {
        this.totalAdmissions = totalAdmissions;
    }

    public long getTotalCourses() {
        return totalCourses;
    }

    public void setTotalCourses(long totalCourses) {
        this.totalCourses = totalCourses;
    }

    public long getTotalCounselors() {
        return totalCounselors;
    }

    public void setTotalCounselors(long totalCounselors) {
        this.totalCounselors = totalCounselors;
    }

    public long getTotalFollowUps() {
        return totalFollowUps;
    }

    public void setTotalFollowUps(long totalFollowUps) {
        this.totalFollowUps = totalFollowUps;
    }
}