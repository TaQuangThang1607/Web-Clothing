package com.example.Shoes.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Shoes.Model.Role;

public interface RoleRepository extends JpaRepository<Role,Long>{
    
}
