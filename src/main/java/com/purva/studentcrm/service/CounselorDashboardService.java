package com.purva.studentcrm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.purva.studentcrm.dto.CounselorDashboardResponse;
import com.purva.studentcrm.entity.User;
import com.purva.studentcrm.repository.AdmissionRepository;
import com.purva.studentcrm.repository.FollowUpRepository;
import com.purva.studentcrm.repository.LeadRepository;

@Service
public class CounselorDashboardService {

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private AdmissionRepository admissionRepository;

    @Autowired
    private FollowUpRepository followUpRepository;

    @Autowired
    private UserService userService;

    public CounselorDashboardResponse getDashboard(String email) {

        User user = userService.getUserByEmail(email);

        CounselorDashboardResponse dto = new CounselorDashboardResponse();

        dto.setMyLeads(
                leadRepository.countByCounselorUserId(user.getUserId())
        );

        dto.setPendingLeads(
                leadRepository.countByCounselorUserIdAndStatus(
                        user.getUserId(),
                        "Pending"
                )
        );

        dto.setPendingLeads(
                leadRepository.countPendingLeads(
                        user.getUserId()
                )
        );

        dto.setFollowUps(
                followUpRepository.countByLeadCounselorUserId(
                        user.getUserId()
                )
        );

        return dto;
    }
}