package com.example.Shoes.Model.dto.cart;

import java.util.List;

import com.example.Shoes.Model.dto.CartDetailDTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartDTO {
    private Long id;

    @NotNull(message = "User ID is required")
    private Long userId;

    private List<CartDetailDTO> cartDetailDTOs;

    public double getSum() {
        return cartDetailDTOs.stream()
            .mapToDouble(dto -> dto.getPrice() * dto.getQuantity())
            .sum();
    }
}