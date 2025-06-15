package com.example.Shoes.Service.impl;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.Shoes.Model.Role;
import com.example.Shoes.Model.User;
import com.example.Shoes.Model.dto.UserDTO;
import com.example.Shoes.Model.mapper.UserMapper;
import com.example.Shoes.Repository.UserRepository;
import com.example.Shoes.Service.UserService;
import com.example.Shoes.utils.error.IdInvalidException;

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
            .orElseThrow(() -> new RuntimeException("user id not found"));

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
    public Optional<User> handleGetUserByEmail(String username) {
         return userRepository.findByEmail(username);
    }

    @Override
    public boolean isEmailExist(String email) {
        return this.userRepository.existsByEmail(email);
    }

    @Override
    public void updataUserToken(String token, String email) {
        Optional<User> currentUser = this.handleGetUserByEmail(email);
        if (currentUser.isPresent()) {
            User user = currentUser.get();
            user.setRefreshToken(token);
            this.userRepository.save(user);
        }
    }

    @Override
    public User getUserByRefreshTokenAndEmail(String token, String email) {
        return this.userRepository.findByRefreshTokenAndEmail(token, email);
    }

   @Override
    public UserDTO updateUser(Long id, UserDTO dto) {
        User existingUser = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setFullName(dto.getFullName());
        existingUser.setPhone(dto.getPhone());
        existingUser.setAddress(dto.getAddress());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            existingUser.setPassword(dto.getPassword());
        }

        if (dto.getRoleId() != null) {
            Role role = new Role();
            role.setId(dto.getRoleId());
            existingUser.setRole(role);
        }

        User updatedUser = userRepository.save(existingUser);
        return userMapper.toDto(updatedUser);
    }

   @Override
   public void generateResetPasswordToken(String email) throws IdInvalidException {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new IdInvalidException("Email không tồn tại");
        }

        User user = userOpt.get();
        String resetToken = UUID.randomUUID().toString();
        user.setResetPasswordToken(resetToken);
        user.setResetPasswordTokenExpiry(Instant.now().plus(15, ChronoUnit.MINUTES));
        userRepository.save(user);
   }

   @Override
   public User verifyResetPasswordToken(String token) throws IdInvalidException {
    User user = userRepository.findByResetPasswordToken(token)
            .orElseThrow(() -> new IdInvalidException("Token đặt lại mật khẩu không hợp lệ"));

        if (user.getResetPasswordTokenExpiry().isBefore(Instant.now())) {
            throw new IdInvalidException("Token đã hết hạn");
        }
        return user;
   }


    
}
