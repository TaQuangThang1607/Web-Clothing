package com.example.Shoes.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Shoes.domain.Product;
import com.example.Shoes.domain.dto.ProductDTO;
import com.example.Shoes.repository.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public Product handleUpdateProduct(ProductDTO dto, Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("id product not found"));
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setSize(dto.getSize());
        product.setColor(dto.getColor());
        product.setPrice(dto.getPrice());
        product.setImageUrl(dto.getImageUrl());

        return productRepository.save(product);

    }

    public void handleRemoveProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("id product not found"));
        productRepository.delete(product);
    }

    public Product handleCreateProduct(ProductDTO dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setSize(dto.getSize());
        product.setColor(dto.getColor());
        product.setPrice(dto.getPrice());
        product.setImageUrl(dto.getImageUrl());
        return productRepository.save(product);
    }
}
