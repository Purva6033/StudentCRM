package com.purva.studentcrm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.purva.studentcrm.dto.CallRecordRequest;
import com.purva.studentcrm.entity.CallRecord;
import com.purva.studentcrm.entity.Lead;
import com.purva.studentcrm.entity.User;
import com.purva.studentcrm.repository.CallRecordRepository;
import com.purva.studentcrm.repository.LeadRepository;
import com.purva.studentcrm.repository.UserRepository;

@Service
public class CallRecordService {

    @Autowired
    private CallRecordRepository callRepository;

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private UserRepository userRepository;

    // ================= SAVE =================

    public CallRecord saveCall(CallRecordRequest request) {

        Lead lead = leadRepository.findById(request.getLeadId())
                .orElseThrow(() -> new RuntimeException("Lead Not Found"));

        User counselor = userRepository.findById(request.getCounselorId())
                .orElseThrow(() -> new RuntimeException("Counselor Not Found"));

        CallRecord call = new CallRecord();

        call.setLead(lead);
        call.setCounselor(counselor);
        call.setCallDate(request.getCallDate());
        call.setCallTime(request.getCallTime());
        call.setCallStatus(request.getCallStatus());
        call.setNotes(request.getNotes());
        call.setNextFollowUpDate(request.getNextFollowUpDate());

        return callRepository.save(call);
    }

    // ================= GET ALL =================

    public List<CallRecord> getAllCalls() {

        return callRepository.findAll();

    }

    // ================= GET BY ID =================

    public CallRecord getCallById(Integer id) {

        return callRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Call Record Not Found"));

    }

    // ================= UPDATE =================

    public CallRecord updateCall(Integer id,
                                 CallRecordRequest request) {

        CallRecord call = getCallById(id);

        Lead lead = leadRepository.findById(request.getLeadId())
                .orElseThrow(() -> new RuntimeException("Lead Not Found"));

        User counselor = userRepository.findById(request.getCounselorId())
                .orElseThrow(() -> new RuntimeException("Counselor Not Found"));

        call.setLead(lead);
        call.setCounselor(counselor);
        call.setCallDate(request.getCallDate());
        call.setCallTime(request.getCallTime());
        call.setCallStatus(request.getCallStatus());
        call.setNotes(request.getNotes());
        call.setNextFollowUpDate(request.getNextFollowUpDate());

        return callRepository.save(call);

    }

    // ================= DELETE =================

    public String deleteCall(Integer id) {

        callRepository.deleteById(id);

        return "Call Record Deleted Successfully";

    }

    // ================= SEARCH =================

    public List<CallRecord> searchCalls(String keyword) {

        return callRepository.findByCallStatusContainingIgnoreCase(keyword);

    }

}