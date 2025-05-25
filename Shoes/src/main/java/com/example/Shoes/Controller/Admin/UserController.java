package com.example.Shoes.Controller.Admin;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.Shoes.domain.dto.UserDTO;
import com.example.Shoes.service.UserService;

@Controller
@RequestMapping("/admin")
public class UserController {

    @Autowired
    private UserService userService;
    
    @GetMapping("/users")
    public ResponseEntity<Map<String,Object>> getAllUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size)
        {

        Pageable pageable = PageRequest.of(page, size);
        Page<UserDTO>userPage = userService.getAllUsers(pageable);

        Map<String,Object> reponse = new HashMap<>();
        reponse.put("users", userPage.getContent());
        reponse.put("currentPage", userPage.getNumber());
        reponse.put("totalItems", userPage.getTotalElements());
        reponse.put("totalPages", userPage.getTotalPages());

        if(userPage.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reponse);

    }
}
