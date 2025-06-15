package com.example.Shoes.Service;

import com.example.Shoes.Model.OrderStatus;
import com.example.Shoes.Model.Product;
import com.example.Shoes.Model.dto.DashboardSummaryDTO;
import com.example.Shoes.Repository.OrderRepository;
import com.example.Shoes.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public DashboardSummaryDTO getDashboardSummary(LocalDateTime startDate, LocalDateTime endDate) {
        DashboardSummaryDTO summary = new DashboardSummaryDTO();

        // Doanh thu
        summary.setTotalRevenue(orderRepository.findRevenueByDateRangeAndStatus(startDate, endDate, OrderStatus.DELIVERED));

        // Tổng đơn hàng
        summary.setTotalOrders(orderRepository.countOrdersByDateRange(startDate, endDate));

        // Đơn hàng theo trạng thái
        List<Object[]> statusCounts = orderRepository.countOrdersByStatus(startDate, endDate);
        Map<OrderStatus, Long> statusMap = new java.util.HashMap<>();
        for (Object[] row : statusCounts) {
            OrderStatus status = (OrderStatus) row[0];
            Long count = (Long) row[1];
            statusMap.put(status, count);
        }
        summary.setOrdersByStatus(statusMap);


        // Top 5 sản phẩm bán chạy
        List<Product> topProducts = productRepository.findTopSoldProducts(5);
        summary.setTopProducts(topProducts.stream()
                .map(p -> new DashboardSummaryDTO.ProductSummaryDTO(p.getId(), p.getName(), p.getQuantity(), p.getSold()))
                .collect(Collectors.toList()));

        // Sản phẩm tồn kho thấp
        List<Product> lowStock = productRepository.findByQuantityLessThan(10);
        summary.setLowStockProducts(lowStock.stream()
                .map(p -> new DashboardSummaryDTO.ProductSummaryDTO(p.getId(), p.getName(), p.getQuantity(), true))
                .collect(Collectors.toList()));

        return summary;
    }
}