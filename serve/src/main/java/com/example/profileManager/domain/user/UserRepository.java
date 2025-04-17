package com.example.profileManager.domain.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, String> {
    UserDetails findByLogin(String login);

    @Query("SELECT u FROM users u WHERE (:keyword = '' OR LOWER(u.login) LIKE CONCAT('%', LOWER(:keyword), '%')) AND u.role = :role")
    Page<User> searchByLogin(@Param("keyword") String keyword, @Param("role") UserRole role, Pageable pageable);
}
