package com.example.Shoes.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.Shoes.domain.User;
import com.example.Shoes.domain.dto.RoleDTO;
import com.example.Shoes.domain.dto.UserDTO;
import com.example.Shoes.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    public Page<UserDTO> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(this::convertToDTO);
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setFullName(user.getFullName());
        userDTO.setAddress(user.getAddress());
        userDTO.setPhone(user.getPhone());

        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setId(user.getRole().getId());
        roleDTO.setName(user.getRole().getName());
        roleDTO.setDescription(user.getRole().getDescription());
        userDTO.setRole(roleDTO);

        return userDTO;
    }
}
