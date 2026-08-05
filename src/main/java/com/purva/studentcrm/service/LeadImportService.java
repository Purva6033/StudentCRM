package com.purva.studentcrm.service;

import java.io.InputStream;
import java.time.LocalDate;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.purva.studentcrm.dto.ImportResponse;
import com.purva.studentcrm.entity.Lead;
import com.purva.studentcrm.repository.LeadRepository;

@Service
public class LeadImportService {

    @Autowired
    private LeadRepository repository;

    public ImportResponse importExcel(MultipartFile file) throws Exception {

        int imported = 0;
        int duplicate = 0;
        int failed = 0;

        InputStream inputStream = file.getInputStream();

        Workbook workbook = WorkbookFactory.create(inputStream);

        Sheet sheet = workbook.getSheetAt(0);

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {

            Row row = sheet.getRow(i);

            if (row == null) {
                continue;
            }

            try {

                String studentName = row.getCell(0).getStringCellValue().trim();
                String phone = row.getCell(1).getStringCellValue().trim();
                String email = row.getCell(2).getStringCellValue().trim();
                String course = row.getCell(3).getStringCellValue().trim();

                // Skip duplicate leads
                if (repository.existsByPhone(phone)
                        || repository.existsByEmail(email)) {

                    duplicate++;
                    continue;
                }

                Lead lead = new Lead();

                lead.setStudentName(studentName);
                lead.setPhone(phone);
                lead.setEmail(email);
                lead.setCourseInterested(course);

                // Default values
                lead.setSource("Excel Import");
                lead.setStatus("NEW");
                lead.setCreatedDate(LocalDate.now());

                repository.save(lead);

                imported++;

            } catch (Exception e) {

                failed++;

            }

        }

        workbook.close();

        return new ImportResponse(imported, duplicate, failed);

    }

}