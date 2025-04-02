package com.example.profileManager.domain.user;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, String> {
    UserDetails findByLogin(String login);

    Page<User> findByRole(UserRole role, Pageable pageable);

    @Query("SELECT u FROM users u WHERE LOWER(u.login) LIKE CONCAT('%', LOWER(:keyword), '%')")
    List<User> searchByLogin(@Param("keyword") String keyword, Pageable pageable);
}
