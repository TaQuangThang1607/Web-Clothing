package com.example.Shoes.Model.dto.order;

import java.util.List;
import lombok.Data;

@Data
public class OrderDetailDTO {
    private Long id;
    private String orderCode;
    private double totalPrice;
    private String paymentMethod;
    private String status;
    private String createdAt;
    private List<Item> items;

    @Data
    public static class Item {
        private Long productId;
        private String productName;
        private String imageUrl;
        private String size;
        private String color;
        private int quantity;
        private double price;
    }
}