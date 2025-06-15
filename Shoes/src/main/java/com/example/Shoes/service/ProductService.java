package com.example.Shoes.Service;


import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.example.Shoes.Model.dto.ProductDTO;

public interface ProductService {
    Page<ProductDTO> getAllProductsAndFilter(Pageable pageable, String search, String brand, Double minPrice, Double maxPrice);
    Page<ProductDTO> getAllProducts(Pageable pageable, String search, String brand);
    ProductDTO getProductById(Long id);
    ProductDTO createProduct(ProductDTO dto, MultipartFile image);
    ProductDTO updateProduct(Long id, ProductDTO dto, MultipartFile image);
    List<ProductDTO> getProductsByIds(List<Long> ids);
    void deleteProduct(Long id);
    List<ProductDTO>fetchAllProduct();
    Map<String, Long> getBrandsCount(String search, Double minPrice, Double maxPrice);
}
