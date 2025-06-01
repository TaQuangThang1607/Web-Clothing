package com.example.Shoes.Service;

import com.example.Shoes.Model.Cart;
import com.example.Shoes.Model.dto.cart.CartDTO;

public interface CartService {
    CartDTO addProductToCart(Long userId, Long productId, int quantity);
    void updateCartTotal(Cart cart);
}
