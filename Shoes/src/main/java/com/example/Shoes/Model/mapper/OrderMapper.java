package com.example.Shoes.Model.mapper;

import org.mapstruct.Mapper;

import com.example.Shoes.Model.Order;
import com.example.Shoes.Model.dto.order.OrderDTO;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order toEntity(OrderDTO dto);
    OrderDTO toDto(Order entity);
}
