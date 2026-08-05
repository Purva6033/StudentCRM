package com.purva.studentcrm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.purva.studentcrm.dto.ImportResponse;
import com.purva.studentcrm.service.LeadImportService;

@RestController
@RequestMapping("/lead")
@CrossOrigin(origins = "*")
public class LeadImportController {

    @Autowired
    private LeadImportService service;

    @PostMapping("/import")
    public ResponseEntity<ImportResponse> importExcel(
            @RequestParam("file") MultipartFile file) throws Exception {

        return ResponseEntity.ok(service.importExcel(file));

    }

}