package com.example.profileManager.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.profileManager.domain.user.AuthenticationDTO;
import com.example.profileManager.domain.user.LoginResponseDTO;
import com.example.profileManager.domain.user.RegisterDTO;
import com.example.profileManager.domain.user.User;
import com.example.profileManager.domain.user.UserRepository;
import com.example.profileManager.domain.user.UserRole;
import com.example.profileManager.infra.security.TokenService;
import com.github.javafaker.Faker;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;

    @GetMapping
    public ResponseEntity<Void> validate() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Validated AuthenticationDTO data,
            HttpServletResponse response) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("register/user")
    public ResponseEntity<Void> registerUser(@RequestBody @Validated RegisterDTO data) {
        if (this.repository.findByLogin(data.login()) != null)
            return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.login(), encryptedPassword, UserRole.USER, data.fullName(), data.email(),
                data.phone(), data.job(), "manually");

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }

    @PostMapping("register/generate")
    public ResponseEntity<Void> registerGenerate() {
        Faker faker = new Faker();

        String[] name = faker.name().username().split("\\.");
        String firstName = name[0];
        String fullName = name[0] + " " + name[1];
        String email = firstName + "@example.com";

        if (this.repository.findByLogin(firstName) != null)
            return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(faker.numerify("#####"));
        User newUser = new User(firstName, encryptedPassword, UserRole.USER, fullName,
                email, faker.phoneNumber().cellPhone(), faker.job().position(), "automatically");

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }

    @PostMapping("register/admin")
    public ResponseEntity<Void> registerAdmin(@RequestBody @Validated RegisterDTO data) {
        if (this.repository.findByLogin(data.login()) != null)
            return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.login(), encryptedPassword, UserRole.ADMIN, data.fullName(), data.email(),
                data.phone(), data.job(), "manually");

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }
}
