package com.example.Shoes.Controller.Admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.Shoes.domain.dto.ProductDTO;
import com.example.Shoes.service.ProductService;
import com.example.Shoes.utils.ApiResponse;
import com.example.Shoes.utils.PagedResponse;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<PagedResponse<ProductDTO>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<ProductDTO> productPage = productService.getAllProducts(PageRequest.of(page, size));
        
        if (productPage.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.ok(new PagedResponse<>(
            productPage.getContent(),
            productPage.getNumber(),
            productPage.getTotalElements(),
            productPage.getTotalPages()
        ));
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<ApiResponse<ProductDTO>> createProduct(
            @RequestPart("product") @Valid ProductDTO dto,
            @RequestPart("image") MultipartFile image,
            BindingResult bindingResult) {
        
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(getValidationErrors(bindingResult)));
        }

        ProductDTO createdProduct = productService.createProduct(dto, image);
        return ResponseEntity.status(201)
                .body(ApiResponse.success(createdProduct, "Product created successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> getProductById(@PathVariable Long id) {
        ProductDTO product = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.success(product));
    }

    @PatchMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<ApiResponse<ProductDTO>> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") @Valid ProductDTO dto,
            @RequestPart(value = "image", required = false) MultipartFile image,
            BindingResult bindingResult) {
        
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(getValidationErrors(bindingResult)));
        }

        ProductDTO updatedProduct = productService.updateProduct(id, dto, image);
        return ResponseEntity.ok(ApiResponse.success(updatedProduct, "Product updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Product deleted successfully"));
    }

    private List<String> getValidationErrors(BindingResult bindingResult) {
        return bindingResult.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());
    }
}