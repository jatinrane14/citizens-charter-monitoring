package com.minor.charter.monitoring.controller;

import com.minor.charter.monitoring.models.PostalStaffModel;
import com.minor.charter.monitoring.services.PostalStaffServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/postalstaff")
public class PostalstaffController extends UserController {

    @Autowired
    PostalStaffServices postalStaffServices;

    @Override
    public String login() {
        return "";
    }

    @PostMapping("/create")
    public ResponseEntity<PostalStaffModel> createPostalStaff(@RequestBody PostalStaffModel staffData){
        PostalStaffModel savedStaff = postalStaffServices.createPostalStaff(staffData);
        return ResponseEntity.ok(savedStaff);
    }
}
