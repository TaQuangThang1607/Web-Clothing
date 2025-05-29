package com.example.Shoes.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Shoes.Model.User;

public interface UserRepository extends JpaRepository<User,Long>{

    User findByEmail(String username);

    boolean existsByEmail(String email);

    User findByRefreshTokenAndEmail(String token, String email);
    
}
