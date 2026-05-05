package com.minor.charter.monitoring.services;

import com.minor.charter.monitoring.models.PostalStaffModel;
import com.minor.charter.monitoring.repository.PostalStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostalStaffServices extends UserServicesImplementation{
    @Autowired
    PostalStaffRepository postalStaffRepo;

    public PostalStaffModel createPostalStaff(PostalStaffModel staff) {
        return postalStaffRepo.save(staff);
    }
}
