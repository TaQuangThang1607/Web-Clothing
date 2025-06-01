package com.example.Shoes.Model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
@Data
public class ProductDTO {
    private Long id;

    @NotBlank(message = "Name is mandatory")
    @Size(max = 100, message = "Name must be less than 100 characters")
    private String name;

    @Size(max = 500, message = "Description must be less than 500 characters")
    private String description;

    @NotBlank(message = "Size is mandatory")
    @Size(max = 10, message = "Size must be less than 10 characters")
    private String size;

    @NotBlank(message = "Color is mandatory")
    @Size(max = 10, message = "Color must be less than 10 characters")
    private String color;

    @NotNull(message = "Price is mandatory")
    @Min(value = 0, message = "Price must be non-negative")
    private Double price;

    private String imageUrl;

    @Size(max = 50, message = "Brand must be less than 50 characters")
    private String brand;

    @Min(value = 0, message = "Quantity must be non-negative")
    private int quantity;

    @Min(value = 0, message = "Sold quantity must be non-negative")
    private int sold;
}
