package com.example.Shoes.Service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.Shoes.Model.Order;
import com.example.Shoes.Model.dto.order.OrderDTO;
import com.example.Shoes.Model.mapper.OrderMapper;
import com.example.Shoes.Repository.OrderReposotory;
import com.example.Shoes.Service.AdminOrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminOrderServiceImpl implements AdminOrderService{
    private final OrderReposotory orderReposotory; 
    private final OrderMapper orderMapper;
     @Override
    public Page<OrderDTO> getPageAllOrders(Pageable pageable) {
       return orderReposotory.findAll(pageable).map(orderMapper::toDto);
    }
     @Override
     public void deleteOrder(Long orderId) {
        Order order = orderReposotory.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Đơn hàng không tồn tại: " + orderId));
        orderReposotory.delete(order);
        
     }
     @Override
     public OrderDTO getOrderById(Long orderId) {
      Order order = orderReposotory.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Đơn hàng không tồn tại: " + orderId));
        return orderMapper.toDto(order);
     }
}
