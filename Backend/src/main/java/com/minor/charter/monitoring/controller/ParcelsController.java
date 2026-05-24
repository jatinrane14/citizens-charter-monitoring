package com.minor.charter.monitoring.controller;

import com.minor.charter.monitoring.models.ParcelsModel;
import com.minor.charter.monitoring.services.ParcelServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/track/{trackingId}")
    public ResponseEntity<ParcelsModel> getParcelByParcelId(@PathVariable String trackingId){
        return parcelServices.getParcelDetails(trackingId);
    }

    @GetMapping("/list")
    public ResponseEntity<List<ParcelsModel>> getAllParcels(){
        return parcelServices.getAllParcels();
    }

    @GetMapping("/today/list")
    public ResponseEntity<List<Map<String,Object>>> getTodayParcel(){
        return parcelServices.getTodayPaarcelsList();
    }

}
