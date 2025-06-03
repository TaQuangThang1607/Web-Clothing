package com.example.Shoes.Model.dto.order;

import lombok.Data;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Data
public class OrderDTO {
    @NotNull
    private String receiverName;
    @NotNull
    private String receiverAddress;
    @NotNull
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$")
    private String receiverPhone;
    private String receiverNote;
    @NotNull
    private String paymentMethod;
    @NotEmpty
    private List<OrderItemDTO> items;

    @Data
    public static class OrderItemDTO {
        private Long productId;
        private int quantity;
        private String size;
        private String color;
    }
}