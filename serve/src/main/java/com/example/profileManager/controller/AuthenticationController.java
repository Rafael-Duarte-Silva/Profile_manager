package com.example.profileManager.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.profileManager.domain.auth.AuthenticationDTO;
import com.example.profileManager.domain.auth.LoginResponseDTO;
import com.example.profileManager.domain.user.RegisterDTO;
import com.example.profileManager.services.AuthorizationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthorizationService authorizationService;

    @GetMapping
    public ResponseEntity<Void> validate() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Validated AuthenticationDTO data) {
        return this.authorizationService.login(data);
    }

    @PostMapping("register/user")
    public ResponseEntity<Void> registerUser(@RequestBody @Validated RegisterDTO data) {
        return this.authorizationService.registerUser(data);
    }

    @PostMapping("register/generate")
    public ResponseEntity<Void> registerGenerate() {
        return this.authorizationService.registerGenerate();
    }

    @PostMapping("register/admin")
    public ResponseEntity<Void> registerAdmin(@RequestBody @Validated RegisterDTO data) {
        return this.authorizationService.registerAdmin(data);
    }
}
