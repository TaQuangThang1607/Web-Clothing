package com.example.Shoes.Controller;

import com.example.Shoes.Model.dto.ProductDTO;
import com.example.Shoes.Model.dto.UserDTO;
import com.example.Shoes.Service.ProductService;
import com.example.Shoes.Service.UserService;
import com.example.Shoes.utils.error.IdInvalidException;
import com.example.Shoes.utils.exception.ResourceNotFoundException;


import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class HomeController {
    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    private final ProductService productService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

   

    @GetMapping("/products")
    public Page<ProductDTO> getAllProducts(
        Pageable pageable,
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String brand,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice
    ) {
        return productService.getAllProductsAndFilter(pageable, search, brand, minPrice, maxPrice);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable @Positive(message = "ID must be positive") Long id) {
        logger.info("Fetching product with id: {}", id);
        try {
            ProductDTO product = productService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (ResourceNotFoundException e) {
            logger.error("Product not found with id: {}", id);
            throw e;
        }
    }
    @GetMapping("/products/brands-count")
    public Map<String, Long> getBrandsCount(
        @RequestParam(required = false) String search,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice
    ) {
        return productService.getBrandsCount(search, minPrice, maxPrice);
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
        @RequestBody UserDTO dto,
        BindingResult bindingResult
    ) throws IdInvalidException {
        logger.info("Registering new user with email: {}", dto.getEmail());

        // Kiểm tra lỗi xác thực
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors()
                    .stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            logger.warn("Validation errors: {}", errorMessage);
            return ResponseEntity.badRequest().body(errorMessage);
        }

        // Kiểm tra email trùng lặp
        boolean isEmailExist = this.userService.isEmailExist(dto.getEmail());
        if (isEmailExist) {
            logger.warn("Email already exists: {}", dto.getEmail());
            throw new IdInvalidException("Email: " + dto.getEmail() + " đã tồn tại");
        }

        // Mã hóa mật khẩu
        String hashPassword = passwordEncoder.encode(dto.getPassword());
        dto.setPassword(hashPassword);

        // Đặt vai trò mặc định là USER (roleId = 2)
        if (dto.getRoleId() == null || (dto.getRoleId() != 1 && dto.getRoleId() != 2)) {
            dto.setRoleId(2L); // USER
        }

        // Tạo người dùng
        try {
            UserDTO createdUser = userService.createUser(dto);
            logger.info("User registered successfully: {}", createdUser.getEmail());
            return ResponseEntity.status(201)
                    .body(createdUser);
        } catch (Exception e) {
            logger.error("Error registering user: {}", e.getMessage());
            return ResponseEntity.status(500)
                    .body(null);
        }
    }

   
}