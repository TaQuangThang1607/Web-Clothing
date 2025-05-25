package com.example.Shoes.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
@Data
public class ProductDTO {
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
    @Positive(message = "Price must be positive")
    private Double price;
}
