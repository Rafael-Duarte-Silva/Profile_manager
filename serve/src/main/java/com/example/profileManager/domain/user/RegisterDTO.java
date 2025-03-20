package com.example.profileManager.domain.user;

public record RegisterDTO(String login, String password, String full_name, String email,
        String phone, String job) {
}
