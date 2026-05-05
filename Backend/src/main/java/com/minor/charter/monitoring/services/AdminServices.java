package com.minor.charter.monitoring.services;

import com.minor.charter.monitoring.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServices extends UserServicesImplementation{
    @Autowired
    AdminRepository adminRepo;

}
