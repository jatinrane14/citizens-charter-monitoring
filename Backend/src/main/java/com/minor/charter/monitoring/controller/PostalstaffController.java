package com.minor.charter.monitoring.controller;

import com.minor.charter.monitoring.dto.AuthResponse;
import com.minor.charter.monitoring.models.CitizenModel;
import com.minor.charter.monitoring.models.PostalStaffModel;
import com.minor.charter.monitoring.models.UserBaseModel;
import com.minor.charter.monitoring.services.PostalStaffServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/postalstaff")
public class PostalstaffController extends UserController {

    @Autowired
    PostalStaffServices postalStaffServices;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody PostalStaffModel user) {
        System.out.println(user);
        return postalStaffServices.verify(user);
    }

    @PostMapping("/create")
    public ResponseEntity<PostalStaffModel> createPostalStaff(@RequestBody PostalStaffModel staffData){
        PostalStaffModel savedStaff = postalStaffServices.createPostalStaff(staffData);
        return ResponseEntity.ok(savedStaff);
    }


    public String login(UserBaseModel user) {
        return "";
    }
}
