package com.minor.charter.monitoring.controller;

import com.minor.charter.monitoring.dto.AuthResponse;
import com.minor.charter.monitoring.models.CitizenModel;
import com.minor.charter.monitoring.models.UserBaseModel;
import com.minor.charter.monitoring.services.CitizenServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/citizen")
public class CitizenController extends UserController{
    @Autowired
    private CitizenServices citizenServices;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody CitizenModel user) {
        System.out.println(user);
        return citizenServices.verify(user);
    }
    @PostMapping("/register")
    public ResponseEntity<Map<String,String>> register(@RequestBody CitizenModel citizen){

        return citizenServices.createCitizen(citizen);
    }

    @GetMapping("/userdetail")
    public ResponseEntity<CitizenModel> getUserDetail(@RequestBody String userID){
        return citizenServices.getUserData(userID);
    }
//    For CLerk and manager to link citizen with parcel
    @GetMapping("/users")
    public ResponseEntity<List<Map<String,Object>>> getUserOptions(){
        return citizenServices.getCitizenOptions();
    }
}
