package com.example.Shoes.domain.dto;

import lombok.Data;

@Data
public class UserDTO {
    private long id;
    private String email;
    private String fullName;
    private String address;
    private String phone;
    private RoleDTO role;

}
