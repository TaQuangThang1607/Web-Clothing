package com.example.Shoes.Model.dto;

import com.example.Shoes.Model.OrderStatus;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class DashboardSummaryDTO {
    private Double totalRevenue;
    private Long totalOrders;
    private Map<OrderStatus, Long> ordersByStatus;
    private List<ProductSummaryDTO> topProducts;
    private List<ProductSummaryDTO> lowStockProducts;

    @Data
    public static class ProductSummaryDTO {
        private Long id;
        private String name;
        private Integer sold;
        private Integer quantity;

        public ProductSummaryDTO(Long id, String name, Integer quantity, Integer sold) {
            this.id = id;
            this.name = name;
            this.quantity = quantity;
            this.sold = sold;
        }

        public ProductSummaryDTO(Long id, String name, Integer quantity, boolean isLowStock) {
            this.id = id;
            this.name = name;
            this.quantity = quantity;
        }
    }
}
