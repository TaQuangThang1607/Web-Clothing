package com.example.Shoes.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Shoes.Model.User;

public interface UserRepository extends JpaRepository<User,Long>{

    Optional<User> findByEmail(String username);

    boolean existsByEmail(String email);

    User findByRefreshTokenAndEmail(String token, String email);
    
}
