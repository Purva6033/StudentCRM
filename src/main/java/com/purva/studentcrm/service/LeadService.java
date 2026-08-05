package com.purva.studentcrm.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.purva.studentcrm.entity.ActivityLog;
import com.purva.studentcrm.repository.ActivityLogRepository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.purva.studentcrm.dto.LeadRequest;
import com.purva.studentcrm.entity.Lead;
import com.purva.studentcrm.exception.ResourceNotFoundException;
import com.purva.studentcrm.repository.LeadRepository;
import com.purva.studentcrm.entity.User;
import com.purva.studentcrm.repository.UserRepository;
@Service
public class LeadService {

    @Autowired
    private LeadRepository repository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ActivityLogRepository activityLogRepository;
   
    private void saveActivity(Lead lead, String action) {

        ActivityLog log = new ActivityLog();

        log.setLead(lead);
        log.setAction(action);
        log.setPerformedBy(
                lead.getCounselor() != null
                        ? lead.getCounselor().getFullName()
                        : "System"
        );
        log.setTimestamp(LocalDateTime.now());

        activityLogRepository.save(log);

    }

    // Search Leads
    public List<Lead> searchLeads(String keyword) {
        return repository.searchLeads(keyword);
    }

    public Lead saveLead(LeadRequest request) {
    	
    	if (repository.existsByEmail(request.getEmail())) {
    	    throw new RuntimeException("Lead with this email already exists.");
    	}

    	if (repository.existsByPhone(request.getPhone())) {
    	    throw new RuntimeException("Lead with this phone number already exists.");
    	}

        Lead lead = new Lead();

        lead.setStudentName(request.getStudentName());
        lead.setEmail(request.getEmail());
        lead.setPhone(request.getPhone());
        lead.setCourseInterested(request.getCourseInterested());
        lead.setSource(request.getSource());
        lead.setStatus(request.getStatus());
        lead.setCreatedDate(LocalDate.now());

        User counselor = userRepository.findById(request.getCounselorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Counselor not found"));

        lead.setCounselor(counselor);

        Lead savedLead = repository.save(lead);

        saveActivity(savedLead, "Lead Created");

        return savedLead;
    }

    // Get All Leads
    public List<Lead> getAllLeads() {
        return repository.findAll();
    }

    // Get Lead By ID
    public Lead getLeadById(Integer id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Lead not found with ID : " + id));
    }

    // Update Lead
    public Lead updateLead(Integer id, LeadRequest request) {

        Lead lead = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Lead not found with ID : " + id));

        lead.setStudentName(request.getStudentName());
        lead.setEmail(request.getEmail());
        lead.setPhone(request.getPhone());
        lead.setCourseInterested(request.getCourseInterested());
        lead.setSource(request.getSource());
        lead.setStatus(request.getStatus());

        User counselor = userRepository.findById(request.getCounselorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Counselor not found"));

        lead.setCounselor(counselor);
        Lead updatedLead = repository.save(lead);

        saveActivity(updatedLead, "Lead Updated");

        return updatedLead;
    }

    // Delete Lead
    public String deleteLead(Integer id) {

        Lead lead = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Lead not found with ID : " + id));

        saveActivity(lead, "Lead Deleted");

        repository.delete(lead);

        return "Lead Deleted Successfully";
    }
    
}