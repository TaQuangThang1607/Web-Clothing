package com.example.Shoes.Model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "products")
public class Product implements Serializable{
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name is required")
    @NotEmpty(message = "Product name cannot be empty")
    @Size(max = 100, message = "Name must be less than 100 characters")
    private String name;

    @Min(value = 0, message = "Price must be non-negative")
    private double price;

    @Size(max = 500, message = "Description must be less than 500 characters")
    private String description;

    @NotNull(message = "Size is required")
    @Size(max = 10, message = "Size must be less than 10 characters")
    private String size;

    @NotNull(message = "Color is required")
    private String color;

    private String imageUrl;

    @Size(max = 50, message = "Brand must be less than 50 characters")
    private String brand;

    @Min(value = 0, message = "Quantity must be non-negative")
    private int quantity;

    @Min(value = 0, message = "Sold quantity must be non-negative")
    private int sold;

    @OneToMany(mappedBy = "product")
    private List<CartDetail> cartDetails;

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<OrderDetail> orderDetails = new ArrayList<>();
}
