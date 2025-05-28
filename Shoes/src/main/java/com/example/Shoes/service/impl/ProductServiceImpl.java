package com.example.Shoes.Service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Shoes.Model.Product;
import com.example.Shoes.Model.dto.ProductDTO;
import com.example.Shoes.Model.mapper.ProductMapper;
import com.example.Shoes.exception.ResourceNotFoundException;
import com.example.Shoes.Repository.ProductRepository;
import com.example.Shoes.Service.FileStorageService;
import com.example.Shoes.Service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final FileStorageService fileStorageService;


    @Override
    public Page<ProductDTO> getAllProducts(Pageable pageable) {
       return productRepository.findAll(pageable)
                .map(productMapper::toDto);
    }
    @Override
    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id).map(productMapper::toDto)
            .orElseThrow(() -> new ResourceNotFoundException("product id not found"));
    }
    @Override
    public ProductDTO createProduct(ProductDTO dto, MultipartFile image) {
        Product product = productMapper.toEntity(dto);
        if (image != null && !image.isEmpty()) {
                String imageUrl = fileStorageService.storeFile(image);
                product.setImageUrl(imageUrl);
            }
            
            Product savedProduct = productRepository.save(product);
            return productMapper.toDto(savedProduct);
    }
    @Override
    public ProductDTO updateProduct(Long id, ProductDTO dto, MultipartFile image) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        productMapper.updateProductFromDto(dto, product);
        
        if (image != null && !image.isEmpty()) {
            // Xóa ảnh cũ nếu có
            if (product.getImageUrl() != null) {
                fileStorageService.deleteFile(product.getImageUrl());
            }
            String newImageUrl = fileStorageService.storeFile(image);
            product.setImageUrl(newImageUrl);
        }
        
        Product updatedProduct = productRepository.save(product);
        return productMapper.toDto(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        if (product.getImageUrl() != null) {
            fileStorageService.deleteFile(product.getImageUrl());
        }
        
        productRepository.delete(product);
    }
    @Override
    public List<ProductDTO> getProductsByIds(List<Long> ids) {
       return productRepository.findAllById(ids)
            .stream()
            .map(productMapper::toDto)
            .collect(Collectors.toList());
    }

    
}