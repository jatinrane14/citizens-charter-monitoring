package com.minor.charter.monitoring.services;

import com.minor.charter.monitoring.models.CitizenModel;
import com.minor.charter.monitoring.models.ParcelsModel;
import com.minor.charter.monitoring.models.PostalBranchModel;
import com.minor.charter.monitoring.models.PostalStaffModel;
import com.minor.charter.monitoring.repository.CitizenRepository;
import com.minor.charter.monitoring.repository.ParcelRepository;
import com.minor.charter.monitoring.repository.PostalBranchRepo;
import com.minor.charter.monitoring.repository.PostalStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ParcelServices {
    @Autowired
    CitizenRepository citizenRepo;

    @Autowired
    PostalStaffRepository staffRepo;

    @Autowired
    PostalBranchRepo branchRepo;

    @Autowired
    ParcelRepository parcelRepo;

    public ResponseEntity<ParcelsModel> createParcel(ParcelsModel parcelRequest){
        // Fetch existing branch from DB
        PostalBranchModel branch =
                branchRepo.findByBranchCode(
                        parcelRequest
                                .getBranch()
                                .getBranchCode()
                );

        // Set managed entity
        parcelRequest.setBranch(branch);

        // Fetch staff
        PostalStaffModel staff =
                staffRepo.findByEmployeeId(
                        parcelRequest
                                .getCreatedBy()
                                .getEmployeeId()
                );

        parcelRequest.setCreatedBy(staff);

        // Optional citizen
        if(parcelRequest.getCitizen() != null) {

            CitizenModel citizen =
                    citizenRepo.findById(
                            parcelRequest
                                    .getCitizen()
                                    .getId()
                    ).orElse(null);

            parcelRequest.setCitizen(citizen);
        }

        return ResponseEntity.ok(parcelRepo.save(parcelRequest));
    }

    public ResponseEntity<Map<String, Object>>
    getParcelDetails(String trackingId) {
        ParcelsModel parcel =
                parcelRepo.findByTrackingId(trackingId);
        if(parcel == null) {
            return ResponseEntity.notFound().build();
        }
        Map<String, Object> response =
                new HashMap<>();
        response.put("trackingId", parcel.getTrackingId());
        response.put("branchCode",parcel.getBranch());
        response.put("status", parcel.getStatus());

        response.put("location",
                parcel.getBranch() != null
                        ? parcel.getBranch()
                        .getBranchName()
                        : "Unknown Location"
        );
        response.put("estimatedDelivery", parcel.getExpectedDeliveryDate()
        );

        response.put("lastUpdated", parcel.getUpdatedAt()
        );

        // Example Current Step Logic
        int currentStep =
                switch (parcel.getStatus()) {
                    case BOOKED -> 0;
                    case PROCESSGIN -> 1;
                    case IN_TRANSIT -> 2;
                    case OUT_FOR_DELIVERY -> 3;
                    case DELIERED -> 4;
                    default -> 0;
        };
        response.put("currentStep", currentStep);

        response.put("email", parcel.getCitizen() != null
                        ? parcel.getCitizen()
                        .getUserEmail()
                        : null
        );
        response.put("citizenID",parcel.getCitizen().getId());
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<List<ParcelsModel>> getAllParcels(){
        List<ParcelsModel> parcels = parcelRepo.findAll();
        return ResponseEntity.ok(parcels);
    }

    public ResponseEntity<List<Map<String, Object>>> getTodayPaarcelsList() {
        LocalDate today = LocalDate.now();
        try{
            List<ParcelsModel> parcels = parcelRepo.findByCreatedAtBetween(today.atStartOfDay(), today.plusDays(1).atStartOfDay());
            List<Map<String, Object>> response =
                    parcels.stream().map(parcel -> {
                        Map<String, Object> map = new HashMap<>();
                        map.put("trackingId", parcel.getTrackingId());
                        map.put("receiverName", parcel.getReceiverName());
                        map.put("destination", parcel.getReceiverAddress());
                        map.put("senderName", parcel.getSenderName());
                        map.put("parcelType", parcel.getParcelType());
                        map.put("status", parcel.getStatus());
                        map.put("bookingAmount", parcel.getBookingAmount());
                        map.put("createdAt", parcel.getCreatedAt());
                        map.put("expectedDeliveryDate", parcel.getExpectedDeliveryDate());
                        // Branch Details
                        if(parcel.getBranch() != null) {
                            map.put("branchName", parcel.getBranch().getBranchName());
                            map.put("branchCode", parcel.getBranch().getBranchCode());
                        }
                        // Staff Details
                        if(parcel.getCreatedBy() != null) {
                            map.put("staffName", parcel.getCreatedBy().getUserName());
                            map.put("employeeId", parcel.getCreatedBy().getEmployeeId());
                        }
                        return map;
                    }).toList();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e);
            throw new RuntimeException(e);
        }
    }
}
