package com.example.Shoes.Service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import jakarta.persistence.criteria.Predicate;

import com.example.Shoes.Model.Product;
import com.example.Shoes.Model.dto.ProductDTO;
import com.example.Shoes.Model.mapper.ProductMapper;
import com.example.Shoes.Repository.ProductRepository;
import com.example.Shoes.Service.FileStorageService;
import com.example.Shoes.Service.ProductService;
import com.example.Shoes.utils.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final FileStorageService fileStorageService;

    public Page<ProductDTO> getAllProducts(Pageable pageable, String search, String brand) {
        Specification<Product> spec = Specification.where(null);

        if (search != null && !search.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + search.toLowerCase() + "%"));
        }

        if (brand != null && !brand.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.equal(cb.lower(root.get("brand")), brand.toLowerCase()));
        }

        return productRepository.findAll(spec, pageable)
                .map(productMapper::toDto);
    }

    
    @Override
    public Page<ProductDTO> getAllProductsAndFilter(Pageable pageable, String search, String brand, Double minPrice,
            Double maxPrice) {
        Specification<Product> spec = (root, query, cb) -> {
        List<Predicate> predicates = new ArrayList<>();
        if (search != null) {
            String pattern = "%" + search.toLowerCase() + "%";
            predicates.add(cb.or(
                cb.like(cb.lower(root.get("name")), pattern),
                cb.like(cb.lower(root.get("description")), pattern),
                cb.like(cb.lower(root.get("brand")), pattern)
            ));
        }
        if (brand != null && !brand.isEmpty()) {
            predicates.add(cb.equal(root.get("brand"), brand));
        }
        if (minPrice != null) {
            predicates.add(cb.ge(root.get("price"), minPrice));
        }
        if (maxPrice != null) {
            predicates.add(cb.le(root.get("price"), maxPrice));
        }
        return cb.and(predicates.toArray(new Predicate[0]));
    };
    return productRepository.findAll(spec, pageable).map(productMapper::toDto);
    }


    @Override
    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id)
                .map(productMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Override
    public ProductDTO createProduct(@Valid ProductDTO dto, MultipartFile image) {
        // Kiểm tra logic nghiệp vụ
        if (dto.getQuantity() < 0) {
            throw new IllegalArgumentException("Product quantity cannot be negative");
        }

        Product product = productMapper.toEntity(dto);
        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.storeFile(image);
            product.setImageUrl(imageUrl);
        }

        Product savedProduct = productRepository.save(product);
        return productMapper.toDto(savedProduct);
    }

    @Override
    public ProductDTO updateProduct(Long id, @Valid ProductDTO dto, MultipartFile image) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        // Kiểm tra logic nghiệp vụ
        if (dto.getQuantity() < 0) {
            throw new IllegalArgumentException("Product quantity cannot be negative");
        }

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
    @Transactional
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
        if (ids == null || ids.isEmpty()) {
            return List.of();
        }

        return productRepository.findAllById(ids)
                .stream()
                .map(productMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> fetchAllProduct() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toDto)
                .collect(Collectors.toList());
    }


    @Override
    public Map<String, Long> getBrandsCount(String search, Double minPrice, Double maxPrice) {
        Specification<Product> spec = (root, query, cb) -> {
        List<Predicate> predicates = new ArrayList<>();
        if (search != null) {
            String pattern = "%" + search.toLowerCase() + "%";
            predicates.add(cb.or(
                cb.like(cb.lower(root.get("name")), pattern),
                cb.like(cb.lower(root.get("description")), pattern),
                cb.like(cb.lower(root.get("brand")), pattern)
            ));
        }
        if (minPrice != null) {
            predicates.add(cb.ge(root.get("price"), minPrice));
        }
        if (maxPrice != null) {
            predicates.add(cb.le(root.get("price"), maxPrice));
        }
        return cb.and(predicates.toArray(new Predicate[0]));
    };
    List<Product> products = productRepository.findAll(spec);
    return products.stream()
        .collect(Collectors.groupingBy(
            product -> product.getBrand() != null ? product.getBrand() : "Unknown",
            Collectors.counting()
        ));
    }

    
}