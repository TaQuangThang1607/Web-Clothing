package com.example.Shoes.Service.impl;

import org.springframework.stereotype.Service;

import com.example.Shoes.Model.Cart;
import com.example.Shoes.Model.CartDetail;
import com.example.Shoes.Model.Product;
import com.example.Shoes.Model.dto.cart.CartDTO;
import com.example.Shoes.Model.mapper.CartDetailMapper;
import com.example.Shoes.Model.mapper.CartMapper;
import com.example.Shoes.Repository.CartDetailRepository;
import com.example.Shoes.Repository.CartRepository;
import com.example.Shoes.Repository.ProductRepository;
import com.example.Shoes.Service.CartService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CartServiceImpl implements CartService{
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartDetailRepository cartDetailRepository;
    private final CartMapper cartMapper;
    private final CartDetailMapper cartDetailMapper;

    @Override
    public CartDTO addProductToCart(Long userId, Long productId, int quantity) {
        throw new UnsupportedOperationException("Unimplemented method 'updateCartTotal'");

    }

    @Override
    public void updateCartTotal(Cart cart) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateCartTotal'");
    }
    
}
