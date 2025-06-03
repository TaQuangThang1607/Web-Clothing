package com.example.Shoes.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.example.Shoes.Model.Order;
import com.example.Shoes.Model.dto.order.OrderDTO;
import com.example.Shoes.Model.dto.order.OrderDetailDTO;
import com.example.Shoes.Model.dto.order.OrderHistory;
import com.example.Shoes.Model.dto.order.OrderHistoryDTO;
import com.example.Shoes.Model.dto.order.UpdateStatusRequest;
import com.example.Shoes.Repository.UserRepository;
import com.example.Shoes.Service.impl.OrderServiceImpl;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderServiceImpl orderService;

    @Autowired
    private UserRepository userRepository;


    private Long getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"))
                .getId();
    }

    // Tạo đơn hàng từ OrderDTO
    @PostMapping("/create")
    public ResponseEntity<OrderDetailDTO> createOrder(
            @RequestBody OrderDTO orderDTO,
            Authentication authentication) {
        String email = authentication.getName();
        Long userId = getUserIdByEmail(email);

        Order order = orderService.createOrder(orderDTO, userId);
        OrderDetailDTO orderDetailDTO = convertToOrderDetailDTO(order);
        return ResponseEntity.ok(orderDetailDTO);
    }

    // Lấy danh sách đơn hàng của người dùng
    @GetMapping
    public ResponseEntity<List<OrderDetailDTO>> getUserOrders(Authentication authentication) {
        String email = authentication.getName();
        Long userId = getUserIdByEmail(email);

        List<Order> orders = orderService.getOrdersByUserId(userId);
        List<OrderDetailDTO> orderDetailDTOs = orders.stream()
                .map(this::convertToOrderDetailDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(orderDetailDTOs);
    }

    // Lấy chi tiết một đơn hàng
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDetailDTO> getOrderDetails(
            @PathVariable Long orderId,
            Authentication authentication) {
        String email = authentication.getName();
        Long userId = getUserIdByEmail(email);

        Order order = orderService.getOrderById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
        
        // Kiểm tra quyền truy cập: chỉ người dùng sở hữu đơn hàng hoặc admin
        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("Không có quyền truy cập đơn hàng này");
        }

        OrderDetailDTO orderDetailDTO = convertToOrderDetailDTO(order);
        return ResponseEntity.ok(orderDetailDTO);
    }

    // Cập nhật trạng thái đơn hàng (dành cho admin)
    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderDetailDTO> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody UpdateStatusRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        Long userId = getUserIdByEmail(email);

        // Giả sử chỉ admin có quyền cập nhật trạng thái
        // (Có thể thêm kiểm tra vai trò admin tại đây)

        Order updatedOrder = orderService.updateOrderStatus(
                orderId, request.getStatus(), request.getNote(), userId);
        OrderDetailDTO orderDetailDTO = convertToOrderDetailDTO(updatedOrder);
        return ResponseEntity.ok(orderDetailDTO);
    }

    // Xem lịch sử trạng thái đơn hàng
    @GetMapping("/{orderId}/history")
    public ResponseEntity<List<OrderHistoryDTO>> getOrderHistory(
            @PathVariable Long orderId,
            Authentication authentication) {
        String email = authentication.getName();
        Long userId = getUserIdByEmail(email);

        Order order = orderService.getOrderById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        // Kiểm tra quyền truy cập
        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("Không có quyền truy cập đơn hàng này");
        }

        List<OrderHistoryDTO> history = orderService.getOrderHistory(orderId).stream()
                .map(this::convertToOrderHistoryDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(history);
    }

    // Chuyển đổi Order sang OrderDetailDTO
    private OrderDetailDTO convertToOrderDetailDTO(Order order) {
        OrderDetailDTO dto = new OrderDetailDTO();
        dto.setId(order.getId());
        dto.setOrderCode(order.getOrderCode());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setStatus(order.getStatus().getVietnameseName());
        dto.setCreatedAt(order.getCreatedDate().toString());
        List<OrderDetailDTO.Item> items = order.getOrderDetails().stream()
                .map(detail -> {
                    OrderDetailDTO.Item item = new OrderDetailDTO.Item();
                    item.setProductId(detail.getProduct().getId());
                    item.setProductName(detail.getProduct().getName());
                    item.setImageUrl(detail.getProduct().getImageUrl());
                    item.setSize(detail.getProduct().getSize());
                    item.setColor(detail.getProduct().getColor());
                    item.setQuantity(detail.getQuantity());
                    item.setPrice(detail.getPrice());
                    return item;
                })
                .collect(Collectors.toList());
        dto.setItems(items);
        return dto;
    }
    private OrderHistoryDTO convertToOrderHistoryDTO(OrderHistory history) {
        OrderHistoryDTO dto = new OrderHistoryDTO();
        dto.setStatus(history.getStatus());
        dto.setNote(history.getNote());
        dto.setCreatedAt(history.getCreatedAt());
        dto.setChangedBy(history.getChangedBy().getEmail());
        return dto;
    }
}