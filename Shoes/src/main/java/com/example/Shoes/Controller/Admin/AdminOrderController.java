package com.example.Shoes.Controller.Admin;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Shoes.Model.dto.order.OrderDTO;
import com.example.Shoes.Service.OrderService;
import com.example.Shoes.utils.PagedResponse;

@RestController
@RequestMapping("/admin/order")
@PreAuthorize("hasRole('ADMIN')")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<PagedResponse<OrderDTO>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
            Page<OrderDTO> orderPage = orderService.getAllOrders(PageRequest.of(page, size));
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
}
