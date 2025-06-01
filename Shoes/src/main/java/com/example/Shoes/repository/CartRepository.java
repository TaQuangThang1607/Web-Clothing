package com.example.Shoes.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Shoes.Model.Cart;
@Repository
public interface CartRepository extends JpaRepository<Cart,Long>{
    Cart findByUserId(Long userId);
}
