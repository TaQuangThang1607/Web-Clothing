package com.example.Shoes.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Shoes.Model.CartDetail;
@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Long>{
    
}
