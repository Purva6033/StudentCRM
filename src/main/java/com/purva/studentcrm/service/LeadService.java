package com.purva.studentcrm.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.purva.studentcrm.dto.LeadRequest;
import com.purva.studentcrm.entity.Lead;
import com.purva.studentcrm.exception.ResourceNotFoundException;
import com.purva.studentcrm.repository.LeadRepository;

@Service
public class LeadService {

    @Autowired
    private LeadRepository repository;

    // Search Leads
    public List<Lead> searchLeads(String keyword) {
        return repository.searchLeads(keyword);
    }

    // Save Lead
    public Lead saveLead(LeadRequest request) {

        Lead lead = new Lead();

        lead.setStudentName(request.getStudentName());
        lead.setEmail(request.getEmail());
        lead.setPhone(request.getPhone());
        lead.setCourseInterested(request.getCourseInterested());
        lead.setSource(request.getSource());
        lead.setStatus(request.getStatus());
        lead.setCreatedDate(LocalDate.now());

        return repository.save(lead);
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

        return repository.save(lead);
    }

    // Delete Lead
    public String deleteLead(Integer id) {

        Lead lead = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Lead not found with ID : " + id));

        repository.delete(lead);

        return "Lead Deleted Successfully";
    }
}