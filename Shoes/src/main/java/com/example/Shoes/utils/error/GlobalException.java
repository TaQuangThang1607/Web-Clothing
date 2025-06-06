package com.example.Shoes.utils.error;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.Shoes.Model.RestResponse;


@RestControllerAdvice
public class GlobalException {
    @ExceptionHandler(value = {
            IdInvalidException.class,
            UsernameNotFoundException.class,
            BadCredentialsException.class
    })

    // can thiet vao phan handle
    public ResponseEntity<RestResponse<Object>> handleIdException(Exception ex) {
        RestResponse<Object> res = new RestResponse<>();
        res.setStatus(HttpStatus.BAD_REQUEST.value());

        if (ex instanceof UsernameNotFoundException) {
            res.setError("Tài khoản không tồn tại");
            res.setMessage("UsernameNotFoundException");
        } else if (ex instanceof BadCredentialsException) {
            res.setError("Mật khẩu không chính xác");
            res.setMessage("BadCredentialsException");
        } else if (ex instanceof IdInvalidException) {
            res.setError(ex.getMessage());
            res.setMessage("IdInvalidException");
        } else {
            res.setError("Đã xảy ra lỗi: " + ex.getMessage());
            res.setMessage("UnexpectedException");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RestResponse<Object>> validationError(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        final List<FieldError> fieldErrors = result.getFieldErrors();

        RestResponse<Object> res = new RestResponse<>();
        res.setStatus(HttpStatus.BAD_REQUEST.value());
        res.setError("Validation error");
        
        // Sửa phần collect và thêm thông tin message
        List<String> errors = fieldErrors.stream()
                .map(f -> f.getField() + ": " + f.getDefaultMessage())
                .collect(Collectors.toList());
        
        res.setMessage(errors);
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }
}