package com.minor.charter.monitoring.controller;

import com.minor.charter.monitoring.services.GovtOfficialServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GovtOfficialController extends UserController{

    @Autowired
    GovtOfficialServices govtOfficialServices;

    @Override
    public String login() {
        return "";
    }

    @GetMapping("/")
    public String home(){
        return "Working";
    }

}
