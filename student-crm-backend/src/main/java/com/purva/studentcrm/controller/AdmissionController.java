package com.purva.studentcrm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.purva.studentcrm.dto.AdmissionRequest;
import com.purva.studentcrm.entity.Admission;
import com.purva.studentcrm.service.AdmissionService;

@RestController
@RequestMapping("/admission")
public class AdmissionController {

    @Autowired
    private AdmissionService service;

    @PutMapping("/approve/{id}")
    public ResponseEntity<Admission> approveAdmission(@PathVariable Integer id) {
        return ResponseEntity.ok(service.approveAdmission(id));
    }

    

    // Save Admission
    @PostMapping("/save")
    public ResponseEntity<Admission> saveAdmission(@RequestBody AdmissionRequest request) {

        return new ResponseEntity<>(service.saveAdmission(request), HttpStatus.CREATED);
    }

    // Get All Admissions
    @GetMapping("/all")
    public ResponseEntity<List<Admission>> getAllAdmissions() {

        return ResponseEntity.ok(service.getAllAdmissions());
    }

    // Get Admission By Id
    @GetMapping("/{id}")
    public ResponseEntity<Admission> getAdmissionById(@PathVariable Integer id) {

        return ResponseEntity.ok(service.getAdmissionById(id));
    }
 // Update Admission
    @PutMapping("/update/{id}")
    public ResponseEntity<Admission> updateAdmission(
            @PathVariable Integer id,
            @RequestBody AdmissionRequest request) {

        return ResponseEntity.ok(service.updateAdmission(id, request));
    }

    
    // Delete Admission
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAdmission(@PathVariable Integer id) {

        return ResponseEntity.ok(service.deleteAdmission(id));
    }
   
}