package com.example.Shoes.service.impl;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.Shoes.Model.dto.UserDTO;
import com.example.Shoes.Model.mapper.UserMapper;
import com.example.Shoes.exception.ResourceNotFoundException;
import com.example.Shoes.repository.UserRepository;
import com.example.Shoes.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public Page<UserDTO> getAllUser(Pageable pageable) {
        return userRepository.findAll(pageable).map(userMapper::toDto);
    }

    @Override
    public UserDTO getUserById(Long id) {
        return userRepository.findById(id).map(userMapper::toDto)
            .orElseThrow(() -> new ResourceNotFoundException("user id not found"));

    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
        
    }

    
}
