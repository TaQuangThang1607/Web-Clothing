package com.example.Shoes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Shoes.domain.User;
@Repository
public interface UserRepository  extends JpaRepository<User,Long>{
    
}
