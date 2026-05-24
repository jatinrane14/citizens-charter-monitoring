package com.minor.charter.monitoring.services;

import com.minor.charter.monitoring.models.CitizenModel;
import com.minor.charter.monitoring.models.ComplaintModel;
import com.minor.charter.monitoring.models.PostalBranchModel;
import com.minor.charter.monitoring.repository.CitizenRepository;
import com.minor.charter.monitoring.repository.ComplaintsRepo;
import com.minor.charter.monitoring.repository.PostalBranchRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ComplaintServices {
    @Autowired
    private PostalBranchRepo branchRepo;

    @Autowired
    private CitizenRepository citizenRepo;

    @Autowired
    private ComplaintsRepo complaintsRepo;

    public ResponseEntity<ComplaintModel> createComplaint(ComplaintModel complaint){
        try {
            long count = complaintsRepo.count();
            complaint.setComplaintId("COMP-"+count);
            // Fetch Existing Branch
            PostalBranchModel branch =
                    branchRepo.findByBranchCode(
                            complaint.getBranch()
                                    .getBranchCode()
                    );

            complaint.setBranch(branch);

            // Fetch Existing Citizen
            CitizenModel citizen =
                    (CitizenModel) citizenRepo.findByUserEmail(
                            complaint.getCitizen()
                                    .getUserEmail()
                    );

            complaint.setCitizen(citizen);

            String priority =
                    switch (complaint.getComplaintType()){
                        case "DELAYED_DELIVERY", "WRONG_DELIVERY" -> "MEDIUM";
                        case "ITEM_LOST"
                                -> "CRITICAL";
                        case "ITEM_DAMAGED"
                                -> "HIGH";
                        case "STAFF_BEHAVIOR"
                                -> "LOW";
                        default
                                -> "NONE";
                    };
            complaint.setPriority(priority);
            return ResponseEntity.ok(complaintsRepo.save(complaint));
        } catch (Exception e) {
            System.out.println(e);
            throw new RuntimeException(e);
        }

    }


    public ResponseEntity<List<Map<String,Object>>>
    getFewComplaints() {

        List<ComplaintModel> complaints =
                complaintsRepo.getLatestComplaints(
                        PageRequest.of(0,4)
                );

        List<Map<String,Object>> response =
                complaints.stream()
                        .map(c -> {

                            Map<String,Object> map =
                                    new HashMap<>();

                            map.put(
                                    "complaintId",
                                    c.getComplaintId()
                            );

                            map.put(
                                    "citizenName",

                                    c.getCitizen() != null
                                            ? c.getCitizen()
                                            .getName()

                                            : "Unknown"
                            );

                            map.put(
                                    "description",
                                    c.getDescription()
                            );

                            map.put(
                                    "priority",
                                    c.getPriority()
                            );

                            map.put(
                                    "status",
                                    c.getStatus()
                            );

                            map.put(
                                    "trackingId",
                                    c.getTrackingId()
                            );

                            return map;

                        }).toList();

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<List<Map<String, Object>>> getAllComplaintsByBranch(String branchCode) {
        List<ComplaintModel> complaints =
                complaintsRepo.findByBranch_BranchCode(branchCode);

        List<Map<String, Object>> response =
                complaints.stream()
                        .map(complaint -> {

                            Map<String, Object> map =
                                    new HashMap<>();

                            // Complaint Details
                            map.put(
                                    "complaintId",
                                    complaint.getComplaintId()
                            );

                            map.put(
                                    "complaintType",
                                    complaint.getComplaintType()
                            );

                            map.put(
                                    "description",
                                    complaint.getDescription()
                            );

                            map.put(
                                    "priority",
                                    complaint.getPriority()
                            );

                            map.put(
                                    "status",
                                    complaint.getStatus()
                            );

                            map.put(
                                    "trackingId",
                                    complaint.getTrackingId()
                            );

                            // Citizen Details
                            if (complaint.getCitizen() != null) {

                                map.put(
                                        "citizenName",
                                        complaint.getCitizen()
                                                .getName()
                                );

                                map.put(
                                        "citizenEmail",
                                        complaint.getCitizen()
                                                .getUserEmail()
                                );

                                map.put(
                                        "citizenPhone",
                                        complaint.getCitizen()
                                                .getPhone()
                                );
                            }

                            // Branch Details
                            if (complaint.getBranch() != null) {

                                map.put(
                                        "branchName",
                                        complaint.getBranch()
                                                .getBranchName()
                                );

                                map.put(
                                        "branchCode",
                                        complaint.getBranch()
                                                .getBranchCode()
                                );

                                map.put(
                                        "branchCity",
                                        complaint.getBranch()
                                                .getCity()
                                );
                            }

                            // Resolution
                            map.put(
                                    "resolutionNotes",
                                    complaint.getResolutionNotes()
                            );

                            map.put(
                                    "resolvedAt",
                                    complaint.getResolvedAt()
                            );

                            // Dates
                            map.put(
                                    "createdAt",
                                    complaint.getCreatedAt()
                            );

                            map.put(
                                    "updatedAt",
                                    complaint.getUpdatedAt()
                            );

                            return map;

                        }).toList();

        return ResponseEntity.ok(response);
    }
}
