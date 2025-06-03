package com.example.Shoes.Model.dto.order;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.example.Shoes.Model.Order;
import com.example.Shoes.Model.OrderStatus;
import com.example.Shoes.Model.User;

@Entity
@Table(name = "order_history")
@Data
public class OrderHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private String note; // Ghi chú khi chuyển trạng thái

    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "changed_by")
    private User changedBy; // Người thay đổi trạng thái
}
