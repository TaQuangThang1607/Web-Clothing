package com.example.Shoes.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Shoes.Model.Order;
@Repository
public interface OrderReposotory extends JpaRepository<Order,Long>{
    
}
