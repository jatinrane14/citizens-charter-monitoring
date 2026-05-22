package com.minor.charter.monitoring.controller;

import com.minor.charter.monitoring.models.PostalBranchModel;
import com.minor.charter.monitoring.services.ParcelServices;
import com.minor.charter.monitoring.services.PostalBranchServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/branch")
public class PostalBranchController {

    @Autowired
    PostalBranchServices postalBranchServices;

    @PostMapping("/create")
    public ResponseEntity<PostalBranchModel> createBranch(@RequestBody PostalBranchModel branchData){
        return postalBranchServices.createParcel(branchData);
    }

    @GetMapping("/option/branches")
    public  ResponseEntity<List<Map<String,Object>>> getOptions(){
        return postalBranchServices.getBranches();
    }
}
