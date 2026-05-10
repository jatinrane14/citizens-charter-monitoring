package com.minor.charter.monitoring.services;

import com.minor.charter.monitoring.models.UserBaseModel;
import com.minor.charter.monitoring.models.UserPrinciple;
import com.minor.charter.monitoring.repository.AdminRepository;
import com.minor.charter.monitoring.repository.CitizenRepository;
import com.minor.charter.monitoring.repository.GovtOfficialRepository;
import com.minor.charter.monitoring.repository.PostalStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    CitizenRepository citizenRepo;

    @Autowired
    PostalStaffRepository postalStaffRepo;

    @Autowired
    AdminRepository adminRepo;

    @Autowired
    GovtOfficialRepository govtOfficialRepo;


    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        UserBaseModel user = null;

        user = citizenRepo.findByUserName(userName);

        if(user == null)
            user = postalStaffRepo.findByUserName(userName);

        if(user == null)
            user = adminRepo.findByUserName(userName);

        if(user == null)
            user = govtOfficialRepo.findByUserName(userName);
        if(user == null)
            throw new UsernameNotFoundException("User not found");

        return new UserPrinciple(user);
    }
}
