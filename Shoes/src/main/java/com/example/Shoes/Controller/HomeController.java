package com.example.Shoes.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Shoes.Model.dto.ProductDTO;
import com.example.Shoes.Service.ProductService;

@RestController
@RequestMapping("/admin/custom-products")
public class HomeController {

    private final ProductService productService;

    public HomeController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/by-ids")
    public ResponseEntity<?> getProductsByIds(
            @RequestParam List<Long> ids) {
        
        if (ids.size() > 10) {
            return ResponseEntity.badRequest()
                    .body(List.of("Maximum 10 product IDs allowed"));
        }
        
        List<ProductDTO> products = productService.getProductsByIds(ids);
        
        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.ok(products);
    }
}