package com.minor.charter.monitoring.controller;

import com.minor.charter.monitoring.models.UserBaseModel;
import com.minor.charter.monitoring.services.GovtOfficialServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin
@RestController
public class GovtOfficialController extends UserController{

    @Autowired
    GovtOfficialServices govtOfficialServices;


    public String login(@RequestBody UserBaseModel user) {
        return "";
    }

    @GetMapping("/")
    public String home(){
        return "Working";
    }

}
