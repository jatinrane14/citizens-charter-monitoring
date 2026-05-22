package com.minor.charter.monitoring.services;

import com.minor.charter.monitoring.models.CitizenModel;
import com.minor.charter.monitoring.models.PostalBranchModel;
import com.minor.charter.monitoring.repository.PostalBranchRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PostalBranchServices {
    @Autowired
    PostalBranchRepo postalBranchRepo;

    public ResponseEntity<PostalBranchModel> createParcel(PostalBranchModel branchData) {
        PostalBranchModel res = postalBranchRepo.save(branchData);
        return ResponseEntity.ok(res);
    }

    public ResponseEntity<List<Map<String,Object>>> getBranches(){
        List<PostalBranchModel> branches = postalBranchRepo.findAll();

        List<Map<String,Object>> response = branches.stream().map(branch -> {

            Map<String,Object> map = new HashMap<>();

            map.put("id", branch.getId());
            map.put("branchName",branch.getBranchName());
            map.put("address",branch.getAddress());
            map.put("city",branch.getCity());
            map.put("state",branch.getState());
            map.put("pincode",branch.getPincode());
            return map;
        }).toList();
        return ResponseEntity.ok(response);
    }
}
