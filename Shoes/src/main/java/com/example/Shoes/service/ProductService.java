package com.example.Shoes.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Shoes.domain.Product;
import com.example.Shoes.domain.dto.ProductDTO;
import com.example.Shoes.repository.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final String uploadDir = "images/product/";

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> getAllProduct(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Product handleUpdateProduct(ProductDTO dto, MultipartFile image, Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ID sản phẩm không tồn tại"));

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setSize(dto.getSize());
        product.setColor(dto.getColor());
        product.setPrice(dto.getPrice());

        if (image != null && !image.isEmpty()) {
            try {
                String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, image.getBytes());

                String imageUrl = "/images/product/" + fileName;
                product.setImageUrl(imageUrl);
            } catch (IOException e) {
                throw new RuntimeException("Lỗi khi lưu file hình ảnh: " + e.getMessage());
            }
        }

        return productRepository.save(product);
    }

    public void handleRemoveProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("id product not found"));
        productRepository.delete(product);
    }

    public Product handleCreateProduct(ProductDTO dto, MultipartFile image) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setSize(dto.getSize());
        product.setColor(dto.getColor());
        product.setPrice(dto.getPrice());
        // product.setImageUrl(dto.getImageUrl());

        if (!image.isEmpty()) {
        try {
            String folder = "images/product/";
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get(folder + fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, image.getBytes());

            product.setImageUrl("/images/product/" + fileName);
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi lưu file hình ảnh: " + e.getMessage());
        }
    }


        return productRepository.save(product);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
}
