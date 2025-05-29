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
@RequestMapping("/api")
public class HomeController {

    private final ProductService productService;

    public HomeController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getallProduct(){
        
        List<ProductDTO> list = this.productService.fetchAllProduct();
        return ResponseEntity.ok().body(list);
    }
}