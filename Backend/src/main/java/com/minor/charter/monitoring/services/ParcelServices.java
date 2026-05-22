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
}
