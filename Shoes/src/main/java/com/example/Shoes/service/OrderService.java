package com.example.Shoes.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.Shoes.Model.Order;
import com.example.Shoes.Model.OrderStatus;
import com.example.Shoes.Model.User;
import com.example.Shoes.Model.dto.order.OrderDTO;
import com.example.Shoes.Model.dto.order.OrderHistory;

public interface OrderService {
    Order createOrder(OrderDTO dto, Long userId);
    Order updateOrderStatus(Long orderId, OrderStatus newStatus, 
    String note, Long userId);
    void saveOrderHistory(Order order, OrderStatus status, String note, User user);
    List<Order> getOrdersByUserId(Long userId);
    Optional<Order> getOrderById(Long orderId);
    List<OrderHistory> getOrderHistory(Long orderId);

    Page<OrderDTO> getAllOrders(Pageable pageable);
}
