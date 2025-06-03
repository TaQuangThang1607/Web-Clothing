package com.example.Shoes.Model.dto.order;

import java.time.LocalDateTime;

import com.example.Shoes.Model.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderHistoryDTO {
    private OrderStatus status;
        private String note;
        private LocalDateTime createdAt;
        private String changedBy;
}
