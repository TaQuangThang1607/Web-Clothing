package com.example.Shoes.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.Shoes.Model.dto.order.OrderDTO;
import com.example.Shoes.Model.dto.order.UpdateStatusRequest;

public interface AdminOrderService {
    Page<OrderDTO> getPageAllOrders(Pageable pageable,  String search, String status, String startDate, String endDate);
    void deleteOrder(Long orderId);
    OrderDTO getOrderById(Long orderId);
    OrderDTO updateOrderStatus(Long orderId, UpdateStatusRequest request);

}