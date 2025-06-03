package com.example.Shoes.Model.dto.order;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class CheckoutCartDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long cartId;
    private Long userId;
    private double sumTotal;
    private List<CheckoutCartItemDTO> cartItems = new ArrayList<>();

    @Data
    public static class CheckoutCartItemDTO implements Serializable {
        private static final long serialVersionUID = 1L;

        private Long id;
        private Long productId;
        private String productName;
        private double price;
        private String color;
        private String size;
        private String imageUrl;
        private int quantity;
    }
}