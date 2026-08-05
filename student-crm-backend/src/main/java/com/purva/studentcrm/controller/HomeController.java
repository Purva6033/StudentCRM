package com.purva.studentcrm.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HomeController {
    @GetMapping("/hello")
    public String hello(){
        return "Welcome to Student CRM";
    }
}
