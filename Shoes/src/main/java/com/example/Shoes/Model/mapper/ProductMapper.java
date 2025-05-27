package com.example.Shoes.Model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.Shoes.Model.Product;
import com.example.Shoes.Model.dto.ProductDTO;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product toEntity(ProductDTO dto); 
    ProductDTO toDto(Product entity); 

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "imageUrl", ignore = true)
    void updateProductFromDto(ProductDTO dto, @MappingTarget Product entity);
}
