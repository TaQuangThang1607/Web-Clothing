package com.example.Shoes.domain.mapper;

import org.mapstruct.Mapper;

import com.example.Shoes.domain.Product;
import com.example.Shoes.domain.Role;
import com.example.Shoes.domain.User;
import com.example.Shoes.domain.dto.ProductDTO;
import com.example.Shoes.domain.dto.RoleDTO;
import com.example.Shoes.domain.dto.UserDTO;

@Mapper(componentModel = "spring")
public interface DomainMapper {

    ProductDTO productDTO(Product product);

    UserDTO userDTO(User user);

    RoleDTO roleDTO(Role role);
    
}
