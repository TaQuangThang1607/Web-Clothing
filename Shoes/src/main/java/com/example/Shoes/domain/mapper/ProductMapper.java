package com.example.Shoes.domain.mapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.Shoes.domain.Product;
import com.example.Shoes.domain.dto.ProductDTO;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDTO toDto(Product product);
    Product toEntity(ProductDTO dto);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "imageUrl", ignore = true)
    void updateProductFromDto(ProductDTO dto, @MappingTarget Product entity);
}
