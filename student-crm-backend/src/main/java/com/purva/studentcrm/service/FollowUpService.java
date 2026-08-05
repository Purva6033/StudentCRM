package com.purva.studentcrm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.purva.studentcrm.dto.FollowUpRequest;
import com.purva.studentcrm.entity.FollowUp;
import com.purva.studentcrm.entity.Lead;
import com.purva.studentcrm.exception.ResourceNotFoundException;
import com.purva.studentcrm.repository.FollowUpRepository;
import com.purva.studentcrm.repository.LeadRepository;

@Service
public class FollowUpService {

    @Autowired
    private FollowUpRepository followUpRepository;

    @Autowired
    private LeadRepository leadRepository;

    // Save FollowUp
    public FollowUp saveFollowUp(FollowUpRequest request) {

        Lead lead = leadRepository.findById(request.getLeadId())
                .orElseThrow(() -> new RuntimeException("Lead Not Found"));

        FollowUp followUp = new FollowUp();

        followUp.setLead(lead);
        followUp.setRemarks(request.getRemarks());
        followUp.setFollowUpDate(request.getFollowUpDate());
        followUp.setNextFollowUpDate(request.getNextFollowUpDate());
        followUp.setStatus(request.getStatus());

        return followUpRepository.save(followUp);
    }

    // Get All FollowUps
    public List<FollowUp> getAllFollowUps() {
        return followUpRepository.findAll();
    }

    // Get FollowUp By Id
    public FollowUp getFollowUpById(Integer id) {

        return followUpRepository.findById(id)
        		.orElseThrow(() ->
        	    new ResourceNotFoundException("Follow-up not found with ID : " + id));
    }

    // Update FollowUp
    public FollowUp updateFollowUp(Integer id, FollowUpRequest request) {

        FollowUp followUp = followUpRepository.findById(id)
        		.orElseThrow(() ->
        	    new ResourceNotFoundException("Follow-up not found with ID : " + id));
        Lead lead = leadRepository.findById(request.getLeadId())
                .orElseThrow(() -> new RuntimeException("Lead Not Found"));

        followUp.setLead(lead);
        followUp.setRemarks(request.getRemarks());
        followUp.setFollowUpDate(request.getFollowUpDate());
        followUp.setNextFollowUpDate(request.getNextFollowUpDate());
        followUp.setStatus(request.getStatus());

        return followUpRepository.save(followUp);
    }

    // Delete FollowUp
    public String deleteFollowUp(Integer id) {

        FollowUp followUp = followUpRepository.findById(id)
        		.orElseThrow(() ->
        	    new ResourceNotFoundException("Follow-up not found with ID : " + id));

        followUpRepository.delete(followUp);

        return "FollowUp Deleted Successfully";
    }
}