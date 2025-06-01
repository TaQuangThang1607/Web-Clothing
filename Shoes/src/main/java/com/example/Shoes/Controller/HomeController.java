package com.example.Shoes.Controller;

import com.example.Shoes.Model.dto.ProductDTO;
import com.example.Shoes.Service.ProductService;
import com.example.Shoes.utils.exception.ResourceNotFoundException;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.constraints.Positive;


@RestController
@RequestMapping("/api")
public class HomeController {
    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    private final ProductService productService;

    public HomeController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public Page<ProductDTO> getAllProducts(
        Pageable pageable,
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String brand,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice
    ) {
        return productService.getAllProductsAndFilter(pageable, search, brand, minPrice, maxPrice);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable @Positive(message = "ID must be positive") Long id) {
        logger.info("Fetching product with id: {}", id);
        try {
            ProductDTO product = productService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (ResourceNotFoundException e) {
            logger.error("Product not found with id: {}", id);
            throw e;
        }
    }
    @GetMapping("/products/brands-count")
    public Map<String, Long> getBrandsCount(
        @RequestParam(required = false) String search,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice
    ) {
        return productService.getBrandsCount(search, minPrice, maxPrice);
    }
}