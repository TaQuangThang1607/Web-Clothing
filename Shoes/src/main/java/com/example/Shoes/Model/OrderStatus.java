package com.example.Shoes.Model;

public enum OrderStatus {
    PENDING("Chờ xử lý"),
    PROCESSING("Đang xử lý"),
    SHIPPED("Đã giao hàng"),
    DELIVERED("Giao hàng thành công"),
    CANCELLED("Đã hủy"),
    RETURNED("Trả hàng");

    private final String vietnameseName;

    OrderStatus(String vietnameseName) {
        this.vietnameseName = vietnameseName;
    }

    public String getVietnameseName() {
        return vietnameseName;
    }
}