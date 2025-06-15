package com.example.Shoes.Controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Shoes.Model.User;
import com.example.Shoes.Model.dto.RestLoginDTO;
import com.example.Shoes.Model.dto.UserDTO;
import com.example.Shoes.Repository.UserRepository;
import com.example.Shoes.Service.UserService;
import com.example.Shoes.Service.email.EmailService;
import com.example.Shoes.utils.SecurityUtil;
import com.example.Shoes.utils.error.IdInvalidException;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class AuthController {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityUtil securityUtil;
    private final UserService userService;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Value("${thangjwt.jwt.refresh.token-validity-in-seconds}")
    private long refreshTokenExpiration;


    
   @PostMapping("/auth/login")
public ResponseEntity<RestLoginDTO> login(@RequestBody UserDTO dto) throws IdInvalidException {
    // Kiểm tra sự tồn tại của tài khoản trước
    Optional<User> currentUserDB = userService.handleGetUserByEmail(dto.getEmail());
    if (!currentUserDB.isPresent()) {
        throw new IdInvalidException("Tài khoản không tồn tại");
    }

    try {
        // Tiến hành xác thực
        UsernamePasswordAuthenticationToken authenticationToken = 
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        RestLoginDTO restLoginDTO = new RestLoginDTO();
        User user = currentUserDB.get();
        RestLoginDTO.UserLogin userLogin = new RestLoginDTO.UserLogin(
            user.getId(), 
            user.getEmail(), 
            user.getFullName(),
            user.getRole().getId(),
            user.getRole().getName()
        );
        restLoginDTO.setUser(userLogin);

        String accessToken = securityUtil.createAccessToken(authentication.getName(), restLoginDTO.getUser());
        String refreshToken = securityUtil.createRefreshToken(dto.getEmail(), restLoginDTO);

        restLoginDTO.setAccessToken(accessToken);
        userService.updataUserToken(refreshToken, dto.getEmail());

        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", accessToken)
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(3600) // 1 giờ
            .build();

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(refreshTokenExpiration)
            .build();

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString(), refreshTokenCookie.toString())
            .body(restLoginDTO);

    } catch (BadCredentialsException e) {
        throw new IdInvalidException("Mật khẩu không chính xác");
    } catch (Exception e) {
        throw new IdInvalidException("Đã xảy ra lỗi trong quá trình đăng nhập: " + e.getMessage());
    }
}
   @GetMapping("/auth/account")
    public ResponseEntity<RestLoginDTO.UserGetAccount> getAccount() {
        Optional<String> emailOpt = SecurityUtil.getCurrentUserLogin();
        
        if (emailOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        Optional<User> currentUserDB = this.userService.handleGetUserByEmail(emailOpt.get());
        
        if (currentUserDB.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        User user = currentUserDB.get();
        RestLoginDTO.UserLogin userLogin = new RestLoginDTO.UserLogin(
            user.getId(),
            user.getEmail(),
            user.getFullName(),
            user.getRole().getId(),
            user.getRole().getName()
        );
        
        RestLoginDTO.UserGetAccount userGetAccount = new RestLoginDTO.UserGetAccount();
        userGetAccount.setUser(userLogin);
        
        return ResponseEntity.ok(userGetAccount);
    }



    @GetMapping("/auth/refresh")
    public ResponseEntity<RestLoginDTO> getRefreshToken(
        @CookieValue(name = "refreshToken") String refreshToken
    ) throws IdInvalidException {
       Jwt decodedToken = this.securityUtil.checkValidRefreshToken(refreshToken);
        String email = decodedToken.getSubject();
        
        // Kiểm tra user bằng refresh token và email
        User currentUser = this.userService.getUserByRefreshTokenAndEmail(refreshToken, email);
        if (currentUser == null) {
            throw new IdInvalidException("Refresh Token không hợp lệ");
        }

        RestLoginDTO restLoginDTO = new RestLoginDTO();
        RestLoginDTO.UserLogin userLogin = new RestLoginDTO.UserLogin(
            currentUser.getId(), 
            currentUser.getEmail(), 
            currentUser.getFullName(),
            currentUser.getRole().getId(),
            currentUser.getRole().getName()
        );
        restLoginDTO.setUser(userLogin);

        String accessToken = securityUtil.createAccessToken(email, restLoginDTO.getUser());
        restLoginDTO.setAccessToken(accessToken);

        // Tạo refresh token mới
        String newRefreshToken = this.securityUtil.createRefreshToken(email, restLoginDTO);
        this.userService.updataUserToken(newRefreshToken, email);

        ResponseCookie responseCookie = ResponseCookie
            .from("refreshToken", newRefreshToken)
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(refreshTokenExpiration)
            .build();
        
        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
            .body(restLoginDTO);
    }


    @PostMapping("/auth/logout")
    public ResponseEntity<Void> logout() throws IdInvalidException{
        Optional<String> emailOpt = SecurityUtil.getCurrentUserLogin();
        if (emailOpt.isEmpty()) {
            throw new IdInvalidException("Access Token không hợp lệ");
        }
        String email = emailOpt.get();

        this.userService.updataUserToken(null, email);

        ResponseCookie deleteSpringCookie = ResponseCookie
            .from("refreshToken", null)
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(0)
            .build();

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, deleteSpringCookie.toString())
            .body(null);
        
    }


    @PostMapping("/auth/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestParam String email) throws MessagingException, IdInvalidException {
        userService.generateResetPasswordToken(email);
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new IdInvalidException("Email không tồn tại");
        }
        String resetToken = userOpt.get().getResetPasswordToken();
        emailService.sendResetPasswordEmail(email, resetToken);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth/reset-password")
    public ResponseEntity<Void> resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword) throws IdInvalidException {
        User user = userService.verifyResetPasswordToken(token);
        
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordToken(null); 
        user.setResetPasswordTokenExpiry(null);
        userRepository.save(user);
        
        return ResponseEntity.ok().build();
    }
}
