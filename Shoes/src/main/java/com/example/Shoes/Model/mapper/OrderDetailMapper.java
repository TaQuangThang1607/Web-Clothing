package com.example.Shoes.Model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.Shoes.Model.OrderDetail;
import com.example.Shoes.Model.dto.order.OrderDTO.OrderItemDTO;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "quantity", target = "quantity")
    @Mapping(source = "size", target = "size")
    @Mapping(source = "color", target = "color")
    OrderItemDTO toDto(OrderDetail entity);

    @Mapping(target = "order", ignore = true)
    @Mapping(target = "product", ignore = true)
    @Mapping(target = "id", ignore = true)
    OrderDetail toEntity(OrderItemDTO dto);
}