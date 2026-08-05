package com.purva.studentcrm.dto;

public class CounselorPerformanceDTO {

    private String counselorName;
    private Long totalAdmissions;

    public CounselorPerformanceDTO(String counselorName, Long totalAdmissions) {
        this.counselorName = counselorName;
        this.totalAdmissions = totalAdmissions;
    }

    public String getCounselorName() {
        return counselorName;
    }

    public void setCounselorName(String counselorName) {
        this.counselorName = counselorName;
    }

    public Long getTotalAdmissions() {
        return totalAdmissions;
    }

    public void setTotalAdmissions(Long totalAdmissions) {
        this.totalAdmissions = totalAdmissions;
    }
}