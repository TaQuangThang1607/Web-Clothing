package com.example.Shoes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Shoes.Model.User;

public interface UserRepository extends JpaRepository<User,Long>{
    
}
