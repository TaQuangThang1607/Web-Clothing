package com.example.Shoes.Controller.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Shoes.Model.dto.order.OrderDTO;
import com.example.Shoes.Model.dto.order.UpdateStatusRequest;
import com.example.Shoes.Service.impl.AdminOrderServiceImpl;
import com.example.Shoes.utils.PagedResponse;

@RestController
@RequestMapping("/admin/order")
public class AdminOrderController {

    @Autowired
    private AdminOrderServiceImpl adminOrderServiceImpl;

    @GetMapping
    public ResponseEntity<PagedResponse<OrderDTO>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

            Page<OrderDTO> orderPage = adminOrderServiceImpl.getPageAllOrders(PageRequest.of(page, size), search, status, startDate, endDate);
            if(orderPage.isEmpty()){
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(new PagedResponse<>(
                orderPage.getContent(),
                orderPage.getNumber(),
                orderPage.getTotalElements(),
                orderPage.getTotalPages()            
                ));
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        adminOrderServiceImpl.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long orderId) {
        OrderDTO order = adminOrderServiceImpl.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(
        @PathVariable Long orderId,
        @RequestBody UpdateStatusRequest request) {
        
        OrderDTO updatedOrder = adminOrderServiceImpl.updateOrderStatus(orderId, request);
        return ResponseEntity.ok(updatedOrder);
    }
}
