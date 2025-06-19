package com.example.Shoes.Model.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;

    @Email(message = "Email không hợp lệ")
    @NotBlank(message = "Email không được để trống")
    @Size(max = 100, message = "Email must be less than 100 characters")
    private String email;

    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @NotBlank(message = "Tên không được để trống")
    @Size(max = 100, message = "Full name must be less than 100 characters")
    private String fullName;

    @Size(max = 20, message = "Phone must be less than 20 characters")
    private String phone;

    @Size(max = 200, message = "Address must be less than 200 characters")
    private String address;

    private Long roleId;
}
