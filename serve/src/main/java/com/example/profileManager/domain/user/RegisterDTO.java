package com.example.profileManager.domain.user;

public record RegisterDTO(String login, String password, String fullName, String email,
        String phone, String job) {
}
