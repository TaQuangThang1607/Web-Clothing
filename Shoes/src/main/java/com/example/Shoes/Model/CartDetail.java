package com.example.Shoes.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cart_detail", indexes = {
    @Index(name = "idx_cart_id", columnList = "cart_id"),
    @Index(name = "idx_product_id", columnList = "product_id")
})
@Entity
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Min(value = 0, message = "Quantity must be non-negative")
    private int quantity;

    @Min(value = 0, message = "Price must be non-negative")
    private double price;

    @NotNull(message = "Cart is required")
    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @NotNull(message = "Product is required")
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private String brand;
    private String size;

}