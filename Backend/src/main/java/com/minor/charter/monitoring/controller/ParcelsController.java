package com.minor.charter.monitoring.controller;

import com.minor.charter.monitoring.models.ParcelsModel;
import com.minor.charter.monitoring.services.ParcelServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/parcel")
public class ParcelsController {
    @Autowired
    ParcelServices parcelServices;

    @PostMapping("/create")
    public ResponseEntity<ParcelsModel> createModel(@RequestBody ParcelsModel parcel){
        return parcelServices.createParcel(parcel);
    }

}
