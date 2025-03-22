package com.example.profileManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.profileManager.domain.user.UserRepository;
import com.example.profileManager.domain.user.UserResponseDTO;
import com.example.profileManager.domain.user.UserRole;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    UserRepository repository;

    @GetMapping
    public List<UserResponseDTO> getAll(@RequestParam int page) {
        Pageable pageable = PageRequest.of(page - 1, 8, Sort.by("dateCreated").descending());

        List<UserResponseDTO> userList = repository.findByRole(UserRole.USER, pageable).stream()
                .map(UserResponseDTO::new).toList();

        return userList;
    }

    @DeleteMapping
    public ResponseEntity<Void> login(@RequestBody List<String> ids) {
        repository.deleteAllById(ids);

        return ResponseEntity.ok().build();
    }
}
