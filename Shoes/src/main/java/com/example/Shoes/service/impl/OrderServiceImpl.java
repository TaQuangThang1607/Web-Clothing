package com.example.Shoes.Service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.Shoes.Model.Order;
import com.example.Shoes.Model.OrderDetail;
import com.example.Shoes.Model.OrderStatus;
import com.example.Shoes.Model.Product;
import com.example.Shoes.Model.User;
import com.example.Shoes.Model.dto.order.OrderDTO;
import com.example.Shoes.Model.dto.order.OrderHistory;
import com.example.Shoes.Repository.OrderHistoryRepository;
import com.example.Shoes.Repository.OrderRepository;
import com.example.Shoes.Repository.ProductRepository;
import com.example.Shoes.Repository.UserRepository;
import com.example.Shoes.Service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderHistoryRepository orderHistoryRepository;

    @Override
    public Order createOrder(OrderDTO dto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setOrderCode(generateOrderCode());
        order.setUser(user);
        order.setReceiverName(dto.getReceiverName());
        order.setReceiverAddress(dto.getReceiverAddress());
        order.setReceiverPhone(dto.getReceiverPhone());
        order.setReceiverNote(dto.getReceiverNote());
        order.setPaymentMethod(dto.getPaymentMethod());
        order.setStatus(OrderStatus.PENDING);

        List<OrderDetail> orderDetails = dto.getItems().stream()
                .map(item -> {
                    Product product = productRepository.findById(item.getProductId())
                            .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProductId()));

                    // Kiểm tra số lượng sản phẩm có đủ không
                    if (product.getQuantity() < item.getQuantity()) {
                        throw new RuntimeException("Insufficient stock for product: " + item.getProductId());
                    }

                    // Cập nhật số lượng sản phẩm trong kho
                    product.setQuantity(product.getQuantity() - item.getQuantity());
                    product.setSold(product.getSold() + item.getQuantity());
                    productRepository.save(product);

                    OrderDetail detail = new OrderDetail();
                    detail.setOrder(order);
                    detail.setProduct(product);
                    detail.setQuantity(item.getQuantity());
                    detail.setPrice(product.getPrice());
                    
                    return detail;  
                }).collect(Collectors.toList());

        order.setOrderDetails(orderDetails);
        order.calculateTotalPrice();

        Order savedOrder = orderRepository.save(order);
        
        // Lưu lịch sử đơn hàng
        saveOrderHistory(savedOrder, OrderStatus.PENDING, "Đơn hàng được tạo", user);

        return savedOrder;
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus newStatus, String note, Long userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        OrderStatus oldStatus = order.getStatus();
        order.setStatus(newStatus);
        Order updatedOrder = orderRepository.save(order);

        // Lưu lịch sử thay đổi
        saveOrderHistory(updatedOrder, newStatus, 
                String.format("Thay đổi từ %s sang %s. Ghi chú: %s", 
                        oldStatus.getVietnameseName(), 
                        newStatus.getVietnameseName(), 
                        note), 
                user);

        return updatedOrder;
    }

    @Override
    public void saveOrderHistory(Order order, OrderStatus status, String note, User user) {
        OrderHistory history = new OrderHistory();
        history.setOrder(order);
        history.setStatus(status);
        history.setNote(note);
        history.setChangedBy(user);
        orderHistoryRepository.save(history);
    }
    

    private String generateOrderCode() {
    String code;
    do {
        code = "DH-" + LocalDateTime.now().getYear() + 
               String.format("%06d", UUID.randomUUID().toString().hashCode() & 0xffffff);
    } while (orderRepository.existsByOrderCode(code));
    return code;
}

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);    
    }

    @Override
    public List<OrderHistory> getOrderHistory(Long orderId) {
        // TODO Auto-generated method stub
        return orderHistoryRepository.findByOrderId(orderId);    
    }

   

}
