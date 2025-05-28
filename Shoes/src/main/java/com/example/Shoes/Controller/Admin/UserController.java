package com.example.Shoes.Controller.Admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.Shoes.Model.dto.UserDTO;
import com.example.Shoes.Service.UserService;
import com.example.Shoes.utils.PagedResponse;
import com.example.Shoes.utils.error.IdInvalidException;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/admin/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<PagedResponse<UserDTO>> getAllUser(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        Page<UserDTO> userPage = userService.getAllUser(PageRequest.of(page, size));
        if (userPage.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(new PagedResponse<>(
            userPage.getContent(),
            userPage.getNumber(),
            userPage.getTotalElements(),
            userPage.getTotalPages()
        ));
    }

    @PostMapping
    public ResponseEntity<?> createUser(
        @RequestBody  UserDTO dto,
        BindingResult bindingResult
    ) throws IdInvalidException {
        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(getValidationErrors(bindingResult));
        }
        boolean isEmailExist = this.userService.isEmailExist(dto.getEmail());
        if(isEmailExist){
            throw new IdInvalidException("Email: " + dto.getEmail() + "email đã tồn tại");
        }



        String hashPassword = passwordEncoder.encode(dto.getPassword());
        dto.setPassword(hashPassword);
        UserDTO userDTO = userService.createUser(dto);
        return ResponseEntity.status(201).body(userDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    private List<String> getValidationErrors(BindingResult bindingResult) {
        return bindingResult.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());
    }
}