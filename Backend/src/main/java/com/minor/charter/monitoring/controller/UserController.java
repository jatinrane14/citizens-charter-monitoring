package com.minor.charter.monitoring.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
abstract public class UserController {

    @PostMapping("/login")
    public abstract String login();
}
