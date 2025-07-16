package com.example.profileManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.profileManager.services.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<?> getAll(@RequestParam int page,
            @RequestParam(defaultValue = "dateCreated") String sort, @RequestParam(defaultValue = "") String search) {
        return userService.getAll(page, sort, search);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestBody List<String> ids) {
        return userService.delete(ids);
    }
}
