package com.example.profileManager.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.profileManager.domain.auth.AuthenticationDTO;
import com.example.profileManager.domain.auth.LoginResponseDTO;
import com.example.profileManager.domain.user.RegisterDTO;
import com.example.profileManager.domain.user.User;
import com.example.profileManager.domain.user.UserRepository;
import com.example.profileManager.domain.user.UserRole;
import com.github.javafaker.Faker;

@Service
public class AuthorizationService implements UserDetailsService {
    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByLogin(username);
    }

    public ResponseEntity<LoginResponseDTO> login(AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    public ResponseEntity<Void> registerUser(RegisterDTO data) {
        return this.register(data, "manually", UserRole.USER);
    }

    public ResponseEntity<Void> registerGenerate() {
        Faker faker = new Faker();

        String[] name = faker.name().username().split("\\.");
        String firstName = name[0];
        String fullName = name[0] + " " + name[1];
        String email = firstName + "@example.com";

        RegisterDTO data = new RegisterDTO(firstName, faker.numerify("#####"), fullName,
                email, faker.phoneNumber().cellPhone(), faker.job().position());

        return this.register(data, "manually", UserRole.USER);
    }

    public ResponseEntity<Void> registerAdmin(RegisterDTO data) {
        return this.register(data, "manually", UserRole.ADMIN);
    }

    private ResponseEntity<Void> register(RegisterDTO data, String status, UserRole role) {
        if (this.repository.findByLogin(data.login()) != null)
            return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.login(), encryptedPassword, role, data.fullName(), data.email(),
                data.phone(), data.job(), status);

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }
}
