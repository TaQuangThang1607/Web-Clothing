package com.example.Shoes.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import com.example.Shoes.Model.Order;
import com.example.Shoes.Model.OrderStatus;
import com.example.Shoes.Model.User;
@Repository
public interface OrderReposotory extends JpaRepository<Order,Long>{
    List<Order> findByUser(User user);
    
    List<Order> findByStatus(OrderStatus status);
    
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId ORDER BY o.createdDate DESC")
    List<Order> findUserOrdersWithSort(@Param("userId") Long userId);
    
    boolean existsByOrderCode(String orderCode);
    List<Order> findByUserId(Long userId);

    
}
