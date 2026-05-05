package com.minor.charter.monitoring.services;

import com.minor.charter.monitoring.repository.CitizenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CitizenServices extends UserServicesImplementation{
    @Autowired
    CitizenRepository citizenRepo;

}
