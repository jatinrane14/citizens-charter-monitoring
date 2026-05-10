package com.minor.charter.monitoring.controller;

import com.minor.charter.monitoring.models.UserBaseModel;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminController extends UserController{


    public String login(@RequestBody UserBaseModel user) {
        return "";
    }
}
