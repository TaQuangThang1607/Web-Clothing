package com.example.Shoes.Service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.example.Shoes.Model.dto.ProductDTO;

public interface ProductService {
    Page<ProductDTO> getAllProducts(Pageable pageable);
    ProductDTO getProductById(Long id);
    ProductDTO createProduct(ProductDTO dto, MultipartFile image);
    ProductDTO updateProduct(Long id, ProductDTO dto, MultipartFile image);
    void deleteProduct(Long id);
}
