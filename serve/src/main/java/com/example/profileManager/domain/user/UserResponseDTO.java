package com.example.profileManager.domain.user;

import java.sql.Timestamp;

public record UserResponseDTO(String login, String full_name, String email,
        String phone, String job, String status, Timestamp date_created) {

    public UserResponseDTO(User user) {
        this(user.getLogin(), user.getFull_name(), user.getEmail(), user.getPhone(), user.getJob(), user.getStatus(),
                user.getDate_created());
    }
}
