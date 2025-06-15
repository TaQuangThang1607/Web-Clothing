package com.example.Shoes.Service;


import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.Shoes.Model.User;
import com.example.Shoes.Model.dto.UserDTO;
import com.example.Shoes.utils.error.IdInvalidException;

public interface UserService {
    Page<UserDTO> getAllUser(Pageable pageable);
    UserDTO getUserById(Long id);
    void deleteUser (Long id);
    UserDTO createUser(UserDTO dto);
    Optional<User> handleGetUserByEmail(String username);
    boolean isEmailExist(String email);
    void updataUserToken(String token, String email);

    User getUserByRefreshTokenAndEmail(String token, String email);
    UserDTO updateUser(Long id, UserDTO dto);

    void generateResetPasswordToken(String email) throws IdInvalidException;
    User verifyResetPasswordToken(String token) throws IdInvalidException;
}
