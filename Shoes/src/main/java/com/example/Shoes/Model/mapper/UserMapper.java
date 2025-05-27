package com.example.Shoes.Model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.example.Shoes.Model.Role;
import com.example.Shoes.Model.User;
import com.example.Shoes.Model.dto.UserDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "role", source = "roleId", qualifiedByName = "roleIdToRole")
    User toEntity(UserDTO dto);

    @Mapping(target = "roleId", source = "role.id")
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