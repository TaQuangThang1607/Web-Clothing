package com.example.Shoes.Controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
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

    @Value("${thangjwt.jwt.refresh.token-validity-in-seconds}")
    private long refreshTokenExpiration;
    
    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(@RequestBody UserDTO dto) {
        UsernamePasswordAuthenticationToken authenticationToken = 
            new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        
        RestLoginDTO restLoginDTO = new RestLoginDTO();

        User currentUserDB = userService.handleGetUserByEmail(dto.getEmail());

        if(currentUserDB != null){
            RestLoginDTO.UserLogin userLogin = new RestLoginDTO.UserLogin
            (currentUserDB.getId(), currentUserDB.getEmail(), currentUserDB.getFullName());
            restLoginDTO.setUser(userLogin);
        }

        String accessToken = securityUtil.createAccessToken(authentication, restLoginDTO.getUser());

        restLoginDTO.setAccessToken(accessToken);

        //create refresh token
        String refreshToken = this.securityUtil.createRefreshToken(dto.getEmail(), restLoginDTO);
        
        this.userService.updataUserToken(refreshToken, dto.getEmail());

        ResponseCookie responseCookie = ResponseCookie.from("refreshToken", refreshToken)
        .httpOnly(true)
        .secure(true)
        .path("/")
        .maxAge(refreshTokenExpiration)
        .build();
        
        
        return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
        .body(restLoginDTO);
    }

    
    @GetMapping("/auth/account")
    public ResponseEntity<RestLoginDTO.UserLogin> getaccount() {
        Optional<String> currentUserLogin = SecurityUtil.getCurrentUserLogin();
        
        if (!currentUserLogin.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User currentUserDB = userService.handleGetUserByEmail(currentUserLogin.get());
        if (currentUserDB == null) {
            return ResponseEntity.notFound().build();
        }

        RestLoginDTO.UserLogin userLogin = new RestLoginDTO.UserLogin(
            currentUserDB.getId(),
            currentUserDB.getEmail(),
            currentUserDB.getFullName()
        );
        
        return ResponseEntity.ok().body(userLogin);
    }

    @GetMapping("/auth/refresh")
    public ResponseEntity<String> getRefreshToken(
        @CookieValue(name = "refresh_token", required = false) String refreshToken1,
        @CookieValue(name = "refreshToken", required = false) String refreshToken2
    ) {
        String refreshToken = refreshToken1 != null ? refreshToken1 : refreshToken2;
        if (refreshToken == null) {
            return ResponseEntity.badRequest().body("Missing refresh token cookie");
        }
        return ResponseEntity.ok().body(refreshToken);
    }
}
