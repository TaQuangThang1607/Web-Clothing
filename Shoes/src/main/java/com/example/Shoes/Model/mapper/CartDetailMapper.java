package com.example.Shoes.Model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.Shoes.Model.CartDetail;
import com.example.Shoes.Model.dto.CartDetailDTO;

@Mapper(componentModel = "spring")
public interface CartDetailMapper {
    CartDetailMapper INSTANCE = Mappers.getMapper(CartDetailMapper.class);

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName", defaultValue = "")
    @Mapping(source = "product.imageUrl", target = "productImageUrl", defaultValue = "")
    @Mapping(source = "product.brand", target = "brand", defaultValue = "")
    @Mapping(source = "product.size", target = "size", defaultValue = "")
    @Mapping(source = "cart.id", target = "cartId")
    CartDetailDTO toCartDetailDTO(CartDetail cartDetail);

    @Mapping(source = "productId", target = "product.id")
    @Mapping(target = "cart", ignore = true)
    CartDetail toCartDetail(CartDetailDTO cartDetailDTO);
}

