package com.purva.studentcrm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.purva.studentcrm.dto.CallRecordRequest;
import com.purva.studentcrm.entity.CallRecord;
import com.purva.studentcrm.service.CallRecordService;

@RestController
@RequestMapping("/call")
@CrossOrigin(origins = "*")
public class CallRecordController {

    @Autowired
    private CallRecordService service;

    // ================= SAVE =================

    @PostMapping("/save")
    public ResponseEntity<CallRecord> saveCall(
            @RequestBody CallRecordRequest request) {

        return new ResponseEntity<>(
                service.saveCall(request),
                HttpStatus.CREATED);

    }

    // ================= GET ALL =================

    @GetMapping("/all")
    public ResponseEntity<List<CallRecord>> getAllCalls() {

        return ResponseEntity.ok(
                service.getAllCalls());

    }

    // ================= GET BY ID =================

    @GetMapping("/{id}")
    public ResponseEntity<CallRecord> getCallById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                service.getCallById(id));

    }

    // ================= UPDATE =================

    @PutMapping("/update/{id}")
    public ResponseEntity<CallRecord> updateCall(
            @PathVariable Integer id,
            @RequestBody CallRecordRequest request) {

        return ResponseEntity.ok(
                service.updateCall(id, request));

    }

    // ================= DELETE =================

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCall(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                service.deleteCall(id));

    }

    // ================= SEARCH =================

    @GetMapping("/search")
    public ResponseEntity<List<CallRecord>> searchCalls(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                service.searchCalls(keyword));

    }

}