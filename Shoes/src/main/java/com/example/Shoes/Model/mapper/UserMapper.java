package com.example.Shoes.Model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import com.example.Shoes.Model.Role;
import com.example.Shoes.Model.User;
import com.example.Shoes.Model.dto.UserDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "roleId", target = "roleId")
    User toEntity(UserDTO dto);

    UserDTO toDto(User user);

    @Named("roleIdToRole")
    default Role roleIdToRole(Long roleId) {
        if (roleId == null) {
            return null;
        }
        Role role = new Role();
        role.setId(roleId);
        return role;
    }
}