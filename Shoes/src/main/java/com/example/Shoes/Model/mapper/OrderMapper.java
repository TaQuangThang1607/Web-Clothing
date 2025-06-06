package com.example.Shoes.Model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import com.example.Shoes.Model.Order;
import com.example.Shoes.Model.OrderDetail;
import com.example.Shoes.Model.dto.order.OrderDTO;
import com.example.Shoes.Model.dto.order.OrderDTO.OrderItemDTO;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "orderCode", target = "orderCode")
    @Mapping(source = "totalPrice", target = "totalPrice")
    @Mapping(source = "paymentMethod", target = "paymentMethod")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "createdDate", target = "createdAt")
    @Mapping(source = "receiverName", target = "receiverName")
    @Mapping(source = "receiverAddress", target = "receiverAddress")
    @Mapping(source = "receiverPhone", target = "receiverPhone")
    @Mapping(source = "receiverNote", target = "receiverNote")
    @Mapping(source = "orderDetails", target = "items", qualifiedByName = "mapOrderDetailsToItems")
    OrderDTO toDto(Order entity);

    Order toEntity(OrderDTO dto);

    @Named("mapOrderDetailsToItems")
    default List<OrderItemDTO> mapOrderDetailsToItems(List<OrderDetail> orderDetails) {
        if (orderDetails == null) {
            return List.of();
        }
        return orderDetails.stream().map(od -> {
            OrderItemDTO item = new OrderItemDTO();
            item.setProductId(od.getProduct().getId());
            item.setQuantity(od.getQuantity());
            item.setSize(od.getProduct().getSize() != null ? String.valueOf(od.getProduct().getSize()) : null);
            item.setColor(od.getProduct().getColor());
            // Thêm các trường từ Product
            item.setProductName(od.getProduct().getName());
            item.setImageUrl(od.getProduct().getImageUrl());
            item.setPrice(od.getPrice());
            return item;
        }).collect(Collectors.toList());
    }
}