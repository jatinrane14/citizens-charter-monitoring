package com.minor.charter.monitoring.controller;

import com.minor.charter.monitoring.dto.AuthResponse;
import com.minor.charter.monitoring.models.AdminModel;
import com.minor.charter.monitoring.models.GovtOfficialModel;
import com.minor.charter.monitoring.models.UserBaseModel;
import com.minor.charter.monitoring.services.AdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminController extends UserController{
    @Autowired
    AdminServices adminServices;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AdminModel user) {
        System.out.println(user);
        return adminServices.verify(user);
    }

    @PostMapping("/create")
    public ResponseEntity<AdminModel> createAdmin(@RequestBody AdminModel admin){
        return adminServices.createAdmin(admin);
    }
}
