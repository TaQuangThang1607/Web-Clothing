package com.example.Shoes.Controller.Admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Shoes.domain.Product;
import com.example.Shoes.domain.dto.ProductDTO;
import com.example.Shoes.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProduct() {
        List<Product> list = productService.getAllProduct();
        if (list.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(list);
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody ProductDTO dto) {
        Product product = productService.handleCreateProduct(dto);
        return ResponseEntity.status(201).body(product);

    }

    @PatchMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@Valid @RequestBody ProductDTO dto, @PathVariable Long id) {

        Product product = productService.handleUpdateProduct(dto, id);
        return ResponseEntity.ok(product);

    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Long id) {
        productService.handleRemoveProduct(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Đã xóa sản phẩm thành công");

        return ResponseEntity.ok(response);
    }
}
