package com.purva.studentcrm.dto;

public class CounselorDashboardResponse {

    private long myLeads;
    private long pendingLeads;
    private long admissions;
    private long followUps;

    public CounselorDashboardResponse() {
    }

    public CounselorDashboardResponse(long myLeads,
                                      long pendingLeads,
                                      long admissions,
                                      long followUps) {
        this.myLeads = myLeads;
        this.pendingLeads = pendingLeads;
        this.admissions = admissions;
        this.followUps = followUps;
    }

    public long getMyLeads() {
        return myLeads;
    }

    public void setMyLeads(long myLeads) {
        this.myLeads = myLeads;
    }

    public long getPendingLeads() {
        return pendingLeads;
    }

    public void setPendingLeads(long pendingLeads) {
        this.pendingLeads = pendingLeads;
    }

    public long getAdmissions() {
        return admissions;
    }

    public void setAdmissions(long admissions) {
        this.admissions = admissions;
    }

    public long getFollowUps() {
        return followUps;
    }

    public void setFollowUps(long followUps) {
        this.followUps = followUps;
    }
}