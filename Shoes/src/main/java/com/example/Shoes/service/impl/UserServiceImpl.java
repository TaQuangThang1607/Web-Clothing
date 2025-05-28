package com.example.Shoes.Service.impl;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.Shoes.Model.User;
import com.example.Shoes.Model.dto.UserDTO;
import com.example.Shoes.Model.mapper.UserMapper;
import com.example.Shoes.Repository.UserRepository;
import com.example.Shoes.Service.UserService;
import com.example.Shoes.exception.ResourceNotFoundException;

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

    @Override
    public UserDTO createUser(UserDTO dto) {
        User user = userMapper.toEntity(dto);
        User saveUser = userRepository.save(user);
        return userMapper.toDto(saveUser);
    }

    @Override
    public User handleGetUserByEmail(String username) {
         return userRepository.findByEmail(username);
    }

    
}
