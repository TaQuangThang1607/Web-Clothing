package com.example.Shoes.Service;

import com.example.Shoes.Model.Order;
import com.example.Shoes.Model.OrderStatus;
import com.example.Shoes.Model.User;
import com.example.Shoes.Model.dto.order.OrderDTO;

public interface OrderService {
    Order createOrder(OrderDTO dto, Long userId);
    Order updateOrderStatus(Long orderId, OrderStatus newStatus, 
    String note, Long userId);
    void saveOrderHistory(Order order, OrderStatus status, String note, User user);

}
