package com.example.Shoes.Model.dto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDetailDTO {
    private Long id;

    @NotNull(message = "Cart ID is required")
    private Long cartId;

    @Min(value = 0, message = "Quantity must be non-negative")
    private int quantity;

    @Min(value = 0, message = "Price must be non-negative")
    private double price;

    @NotNull(message = "Product ID is required")
    private Long productId;

    @NotNull(message = "Product name is required")
    private String productName;

    private String productImageUrl;
}
