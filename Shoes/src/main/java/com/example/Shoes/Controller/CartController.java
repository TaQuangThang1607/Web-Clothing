package com.example.Shoes.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.core.Authentication;
import com.example.Shoes.Model.Cart;
import com.example.Shoes.Model.dto.CartDetailDTO;
import com.example.Shoes.Repository.UserRepository;
import com.example.Shoes.Service.CartService;
import com.example.Shoes.Model.mapper.CartDetailMapper;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartDetailMapper cartDetailMapper;

    private Long getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"))
                .getId();
    }

    @GetMapping
    public ResponseEntity<List<CartDetailDTO>> getCart(Authentication authentication) {
        String email = authentication.getName();
        Long userId = getUserIdByEmail(email);

        Cart cart = cartService.getCartByUserId(userId);
        List<CartDetailDTO> cartItems = cart.getCartDetails().stream()
                .map(cartDetailMapper::toCartDetailDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping("/add")
    public ResponseEntity<List<CartDetailDTO>> addToCart(
            @RequestBody CartDetailDTO request,
            Authentication authentication) {
        String email = authentication.getName();
        Long userId = getUserIdByEmail(email);

        Cart cart = cartService.addToCart(userId, request.getProductId(), request.getQuantity());
        List<CartDetailDTO> cartItems = cart.getCartDetails().stream()
                .map(cartDetailMapper::toCartDetailDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable Long productId,
            Authentication authentication) {
        String email = authentication.getName();
        Long userId = getUserIdByEmail(email);

        cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<Void> updateQuantity(
            @RequestBody CartDetailDTO request,
            Authentication authentication) {
        String email = authentication.getName();
        Long userId = getUserIdByEmail(email);

        cartService.updateQuantity(userId, request.getProductId(), request.getQuantity());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(Authentication authentication) {
        String email = authentication.getName();
        Long userId = getUserIdByEmail(email);

        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }
}