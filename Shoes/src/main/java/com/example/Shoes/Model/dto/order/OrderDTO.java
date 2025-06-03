package com.example.Shoes.Model.dto.order;

import lombok.Data;

import java.util.List;

@Data
public class OrderDTO {
    private String receiverName;
    private String receiverAddress;
    private String receiverPhone;
    private String receiverNote;

    private String paymentMethod;
    
    private List<OrderItemDTO> items;

    @Data
    public static class OrderItemDTO {
        private Long productId;
        private int quantity;
        private String size;
        private String color;
    }
}