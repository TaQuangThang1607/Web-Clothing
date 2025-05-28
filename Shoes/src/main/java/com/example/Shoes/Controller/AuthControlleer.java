package com.example.Shoes.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Shoes.Model.User;
import com.example.Shoes.Model.dto.RestLoginDTO;
import com.example.Shoes.Model.dto.UserDTO;
import com.example.Shoes.Service.UserService;
import com.example.Shoes.utils.SecurityUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class AuthControlleer {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityUtil securityUtil;
    private final UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserDTO dto) {
        UsernamePasswordAuthenticationToken authenticationToken = 
            new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        String accessToken = securityUtil.createToken(authentication);
        
        RestLoginDTO restLoginDTO = new RestLoginDTO();
        User currentUserDB = userService.handleGetUserByEmail(dto.getEmail());
        if(currentUserDB != null){
            RestLoginDTO.UserLogin userLogin = new RestLoginDTO.UserLogin
            (currentUserDB.getId(), currentUserDB.getEmail(), currentUserDB.getFullName());
            restLoginDTO.setUser(userLogin);
        }


        restLoginDTO.setAccessToken(accessToken);
        return ResponseEntity.ok().body(restLoginDTO);
    }
}
