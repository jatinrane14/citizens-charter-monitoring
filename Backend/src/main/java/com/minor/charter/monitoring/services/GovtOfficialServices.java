package com.minor.charter.monitoring.services;

import com.minor.charter.monitoring.repository.GovtOfficialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GovtOfficialServices extends UserServicesImplementation{
    @Autowired
    GovtOfficialRepository govtOfficialRepository;

}
