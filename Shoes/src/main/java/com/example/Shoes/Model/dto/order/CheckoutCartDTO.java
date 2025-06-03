package com.example.Shoes.Model.dto.order;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class CheckoutCartDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long userId;
    private String paymentMethod;
    private double shippingFee;
    private List<CheckoutCartItemDTO> items;

    @Data
    public static class CheckoutCartItemDTO implements Serializable {
        private static final long serialVersionUID = 1L;
        private Long productId;
        private int quantity;
        private String size;
        private String color;
    }
}