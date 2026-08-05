package com.purva.studentcrm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.purva.studentcrm.dto.FollowUpRequest;
import com.purva.studentcrm.entity.FollowUp;
import com.purva.studentcrm.service.FollowUpService;

@RestController
@RequestMapping("/followup")
public class FollowUpController {

    @Autowired
    private FollowUpService service;

    // Save FollowUp
    @PostMapping("/save")
    public ResponseEntity<FollowUp> saveFollowUp(@RequestBody FollowUpRequest request) {

        return new ResponseEntity<>(service.saveFollowUp(request), HttpStatus.CREATED);
    }

    // Get All FollowUps
    @GetMapping("/all")
    public ResponseEntity<List<FollowUp>> getAllFollowUps() {

        return ResponseEntity.ok(service.getAllFollowUps());
    }

    // Get FollowUp By Id
    @GetMapping("/{id}")
    public ResponseEntity<FollowUp> getFollowUpById(@PathVariable Integer id) {

        return ResponseEntity.ok(service.getFollowUpById(id));
    }

    // Update FollowUp
    @PutMapping("/update/{id}")
    public ResponseEntity<FollowUp> updateFollowUp(@PathVariable Integer id,
                                                   @RequestBody FollowUpRequest request) {

        return ResponseEntity.ok(service.updateFollowUp(id, request));
    }

    // Delete FollowUp
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFollowUp(@PathVariable Integer id) {

        return ResponseEntity.ok(service.deleteFollowUp(id));
    }
}