package com.example.profileManager.domain.user;

import java.sql.Timestamp;

public record UserResponseDTO(String id, String login, String fullName, String email,
        String phone, String job, String status, Timestamp dateCreated) {

    public UserResponseDTO(User user) {
        this(user.getId(), user.getLogin(), user.getFullName(), user.getEmail(), user.getPhone(), user.getJob(),
                user.getStatus(), user.getDateCreated());
    }
}
