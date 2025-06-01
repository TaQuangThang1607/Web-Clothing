package com.example.Shoes.Model.mapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.Shoes.Model.Cart;
import com.example.Shoes.Model.dto.cart.CartDTO;

@Mapper(componentModel = "spring", uses = {CartDetailMapper.class})
public interface CartMapper {
    CartMapper INSTANCE = Mappers.getMapper(CartMapper.class);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "cartDetails", target = "cartDetailDTOs")
    CartDTO toCartDTO(Cart cart);

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "cartDetailDTOs", target = "cartDetails")
    Cart toCart(CartDTO cartDTO);
}
