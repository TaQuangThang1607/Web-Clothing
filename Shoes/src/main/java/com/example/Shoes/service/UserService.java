package com.example.Shoes.Service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.Shoes.Model.dto.UserDTO;

public interface UserService {
    Page<UserDTO> getAllUser(Pageable pageable);
    UserDTO getUserById(Long id);
    void deleteUser(Long id);

}
