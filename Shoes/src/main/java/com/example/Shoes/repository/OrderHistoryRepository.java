package com.example.Shoes.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Shoes.Model.dto.order.OrderHistory;
@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory,Long>{
    List<OrderHistory> findByOrderId(Long orderId);
}
