package com.purva.studentcrm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.purva.studentcrm.dto.LeadRequest;
import com.purva.studentcrm.entity.Lead;
import com.purva.studentcrm.service.LeadService;

@RestController
@RequestMapping("/lead")
public class LeadController {

    @Autowired
    private LeadService service;

    // Save Lead
    @PostMapping("/save")
    public ResponseEntity<Lead> saveLead(@RequestBody LeadRequest request) {

        Lead lead = service.saveLead(request);

        return new ResponseEntity<>(lead, HttpStatus.CREATED);
    }

    // Get All Leads
    @GetMapping("/all")
    public ResponseEntity<List<Lead>> getAllLeads() {

        return ResponseEntity.ok(service.getAllLeads());
    }

    // Get Lead By Id
    @GetMapping("/{id}")
    public ResponseEntity<Lead> getLeadById(@PathVariable Integer id) {

        return ResponseEntity.ok(service.getLeadById(id));
    }

    // Update Lead
    @PutMapping("/update/{id}")
    public ResponseEntity<Lead> updateLead(@PathVariable Integer id,
                                           @RequestBody LeadRequest request) {

        return ResponseEntity.ok(service.updateLead(id, request));
    }

    // Delete Lead
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteLead(@PathVariable Integer id) {

        return ResponseEntity.ok(service.deleteLead(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Lead>> searchLeads(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                service.searchLeads(keyword));
    }
}