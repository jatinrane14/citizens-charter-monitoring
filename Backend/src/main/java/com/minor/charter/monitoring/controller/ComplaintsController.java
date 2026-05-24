package com.minor.charter.monitoring.controller;

import com.minor.charter.monitoring.models.ComplaintModel;
import com.minor.charter.monitoring.repository.CitizenRepository;
import com.minor.charter.monitoring.repository.PostalBranchRepo;
import com.minor.charter.monitoring.services.ComplaintServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/complaints")
public class ComplaintsController {

    @Autowired
    private ComplaintServices complaintServices;

    @PostMapping("/create")
    public ResponseEntity<ComplaintModel> citizenComplaint(@RequestBody ComplaintModel complaint){
        return complaintServices.createComplaint(complaint);
    }

    @GetMapping("/top/list")
    public ResponseEntity<List<Map<String,Object>>> getTopComplaints() {
        return complaintServices
                .getFewComplaints();
    }

    @GetMapping("/all/{branchCode}")
    public ResponseEntity<List<Map<String,Object>>> getAllComplaints(@PathVariable String branchCode){
        return complaintServices.getAllComplaintsByBranch(branchCode);
    }
}
