package com.example.Shoes.Service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.Shoes.Model.Cart;
import com.example.Shoes.Model.CartDetail;
import com.example.Shoes.Model.Product;
import com.example.Shoes.Model.User;
import com.example.Shoes.Model.dto.CartDetailDTO;
import com.example.Shoes.Model.mapper.CartDetailMapper;

import com.example.Shoes.Repository.CartRepository;
import com.example.Shoes.Repository.ProductRepository;
import com.example.Shoes.Repository.UserRepository;
import com.example.Shoes.Service.CartService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CartServiceImpl implements CartService{
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartDetailMapper cartDetailMapper;
    @Override
    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Giỏ hàng không tìm thấy cho người dùng ID: " + userId));
    }


    @Override
    public Cart addToCart(Long userId, Long productId, int quantity) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> createNewCart(userId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Sản phẩm không tìm thấy với ID: " + productId));

        CartDetail existingDetail = cart.getCartDetails().stream()
                .filter(detail -> detail.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(null);

        if (existingDetail != null) {
            existingDetail.setQuantity(existingDetail.getQuantity() + quantity);
            existingDetail.setPrice(product.getPrice());
        } else {
            CartDetail newDetail = new CartDetail();
            newDetail.setCart(cart);
            newDetail.setProduct(product);
            newDetail.setQuantity(quantity);
            newDetail.setPrice(product.getPrice());
            newDetail.setBrand(product.getBrand());
            newDetail.setSize(product.getSize());
            cart.getCartDetails().add(newDetail);
        }
        cart.updateSum();
        return cartRepository.save(cart);
    }
    @Override
    public void removeFromCart(Long userId, Long productId) {
        Cart cart = getCartByUserId(userId);
        cart.getCartDetails().removeIf(detail -> detail.getProduct().getId().equals(productId));
        cart.updateSum();
        cartRepository.save(cart);
    }
    @Override
    public void updateQuantity(Long userId, Long productId, int quantity) {
       Cart cart = getCartByUserId(userId);
        CartDetail detail = cart.getCartDetails().stream()
                .filter(d -> d.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Chi tiết giỏ hàng không tìm thấy cho sản phẩm ID: " + productId));

        if (quantity <= 0) {
            cart.getCartDetails().remove(detail);
        } else {
            detail.setQuantity(quantity);
        }
        cart.updateSum();
        cartRepository.save(cart);
    }
    @Override
    public void clearCart(Long userId) {
        Cart cart = getCartByUserId(userId);
        cart.getCartDetails().clear();
        cart.updateSum();
        cartRepository.save(cart);
    }
    @Override
    public Cart createNewCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Người dùng không tìm thấy với ID: " + userId));
        Cart newCart = new Cart();
        newCart.setUser(user);
        newCart.setSum(0.0);
        return cartRepository.save(newCart);
    }
    @Override
    public List<CartDetailDTO> getCartDetails(Long userId) {
        Cart cart = getCartByUserId(userId);
        return cart.getCartDetails().stream()
                .map(cartDetailMapper::toCartDetailDTO)
                .collect(Collectors.toList());
    }

    
    
}
