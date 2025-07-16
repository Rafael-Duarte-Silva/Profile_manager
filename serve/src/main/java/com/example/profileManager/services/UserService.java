package com.example.profileManager.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.profileManager.domain.user.UserRepository;
import com.example.profileManager.domain.user.UserResponseDTO;
import com.example.profileManager.domain.user.UserRole;

@Service
public class UserService {
    @Autowired
    UserRepository repository;

    public ResponseEntity<?> getAll(int page, String sort, String search) {
        Pageable pageable = PageRequest.of(page - 1, 8, Sort.by(sort).descending());

        List<UserResponseDTO> userList = repository.searchByLogin(search, UserRole.USER, pageable).stream()
                .map(UserResponseDTO::new).toList();

        if (userList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(userList);

    }

    public ResponseEntity<Void> delete(List<String> ids) {
        repository.deleteAllById(ids);

        return ResponseEntity.ok().build();
    }
}
