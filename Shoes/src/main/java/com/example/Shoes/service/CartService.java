package com.example.Shoes.Service;

import java.util.List;

import com.example.Shoes.Model.Cart;
import com.example.Shoes.Model.dto.CartDetailDTO;

public interface CartService {
    
    Cart getCartByUserId(Long userId);
    Cart addToCart(Long userId, Long productId, int quantity);
    void removeFromCart(Long userId, Long productId);
    void updateQuantity(Long userId, Long productId, int quantity);
    void clearCart(Long userId);
    Cart createNewCart(Long userId);
    List<CartDetailDTO> getCartDetails(Long userId);
}
