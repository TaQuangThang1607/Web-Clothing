package com.example.Shoes.Service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.Shoes.Model.Order;
import com.example.Shoes.Model.OrderStatus;
import com.example.Shoes.Model.dto.order.OrderDTO;
import com.example.Shoes.Model.dto.order.UpdateStatusRequest;
import com.example.Shoes.Model.mapper.OrderMapper;
import com.example.Shoes.Repository.OrderRepository;
import com.example.Shoes.Service.AdminOrderService;
import jakarta.persistence.criteria.Predicate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminOrderServiceImpl implements AdminOrderService{
    private final OrderRepository orderRepository; 
    private final OrderMapper orderMapper;


   @Override
   public Page<OrderDTO> getPageAllOrders(Pageable pageable,  String search, String status, String startDate, String endDate) {
      Specification<Order> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Tìm kiếm theo orderCode hoặc receiverName
            if (search != null && !search.isEmpty()) {
                String searchPattern = "%" + search.toLowerCase() + "%";
                predicates.add(cb.or(
                    cb.like(cb.lower(root.get("orderCode")), searchPattern),
                    cb.like(cb.lower(root.get("receiverName")), searchPattern)
                ));
            }

            // Lọc theo trạng thái
            if (status != null && !status.isEmpty()) {
                try {
                    OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
                    predicates.add(cb.equal(root.get("status"), orderStatus));
                } catch (IllegalArgumentException e) {
                    // Nếu status không hợp lệ, trả về danh sách rỗng
                    predicates.add(cb.isFalse(cb.literal(true)));
                }
            }

            // Lọc theo ngày đặt hàng
            if (startDate != null && !startDate.isEmpty()) {
                LocalDateTime start = LocalDate.parse(startDate, DateTimeFormatter.ISO_LOCAL_DATE).atStartOfDay();
                predicates.add(cb.greaterThanOrEqualTo(root.get("createdDate"), start));
            }
            if (endDate != null && !endDate.isEmpty()) {
                LocalDateTime end = LocalDate.parse(endDate, DateTimeFormatter.ISO_LOCAL_DATE).atTime(23, 59, 59);
                predicates.add(cb.lessThanOrEqualTo(root.get("createdDate"), end));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return orderRepository.findAll(spec, pageable).map(orderMapper::toDto);
    }

    @Override
    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Đơn hàng không tồn tại: " + orderId));
        orderRepository.delete(order);

     }
     @Override
     public OrderDTO getOrderById(Long orderId) {
      Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Đơn hàng không tồn tại: " + orderId));
        return orderMapper.toDto(order);
     }

     @Override
    public OrderDTO updateOrderStatus(Long orderId, UpdateStatusRequest request) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new IllegalArgumentException("Đơn hàng không tồn tại: " + orderId));
        
        if (request.getStatus() == null) {
            throw new IllegalArgumentException("Trạng thái không được để trống");
        }
        
        if (!isValidStatusTransition(order.getStatus(), request.getStatus())) {
            throw new IllegalArgumentException("Không thể chuyển từ " + 
                order.getStatus().getVietnameseName() + " sang " + 
                request.getStatus().getVietnameseName());
        }
        
        order.setStatus(request.getStatus());
        
        if (request.getNote() != null && !request.getNote().isEmpty()) {
        }
        
        Order updatedOrder = orderRepository.save(order);
        return orderMapper.toDto(updatedOrder);
    }

    private boolean isValidStatusTransition(OrderStatus current, OrderStatus newStatus) {
        if (current == OrderStatus.CANCELLED || current == OrderStatus.RETURNED) {
            return false;
        }
        
       
        return true;
    }
}
