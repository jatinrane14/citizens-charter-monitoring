package com.minor.charter.monitoring.controller;

import com.minor.charter.monitoring.dto.AuthResponse;
import com.minor.charter.monitoring.models.GovtOfficialModel;
import com.minor.charter.monitoring.models.PostalStaffModel;
import com.minor.charter.monitoring.models.UserBaseModel;
import com.minor.charter.monitoring.services.GovtOfficialServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/official")
public class GovtOfficialController extends UserController{

    @Autowired
    GovtOfficialServices govtOfficialServices;


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody GovtOfficialModel user) {
        System.out.println(user);
        return govtOfficialServices.verify(user);
    }


    @PostMapping("/create")
    public  ResponseEntity<GovtOfficialModel> createOfficial(@RequestBody GovtOfficialModel user){
        return govtOfficialServices.createOfficial(user);
    }

}
