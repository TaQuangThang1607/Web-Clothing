package com.example.Shoes.Model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.example.Shoes.Model.dto.order.OrderHistory;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String orderCode; // Mã đơn hàng để hiển thị cho KH

    private double totalPrice;
    private double shippingFee;
    private String paymentMethod;

    // Thông tin người nhận
    private String receiverName;
    private String receiverAddress;
    private String receiverPhone;
    private String receiverNote;

    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderHistory> orderHistories;

    @CreationTimestamp
    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    @Version
    private Long version;

    public void calculateTotalPrice() {
        this.totalPrice = orderDetails.stream()
            .mapToDouble(od -> od.getPrice() * od.getQuantity())
            .sum() + shippingFee;
    }
}