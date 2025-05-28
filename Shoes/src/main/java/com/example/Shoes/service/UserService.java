package com.example.Shoes.Service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.Shoes.Model.User;
import com.example.Shoes.Model.dto.UserDTO;

public interface UserService {
    Page<UserDTO> getAllUser(Pageable pageable);
    UserDTO getUserById(Long id);
    void deleteUser (Long id);
    UserDTO createUser(UserDTO dto);
    User handleGetUserByEmail(String username);
    boolean isEmailExist(String email);

}
