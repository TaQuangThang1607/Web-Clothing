package com.example.Shoes.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Xử lý ResourceNotFoundException
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(
            ResourceNotFoundException ex, WebRequest request) {

        ErrorResponse ErrorResponse = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(ErrorResponse, HttpStatus.NOT_FOUND);
    }

    // Xử lý lỗi validation
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex, WebRequest request) {

        ErrorResponse ErrorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Lỗi validation",
                request.getDescription(false));

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            ErrorResponse.addError(fieldName + ": " + errorMessage);
        });

        return new ResponseEntity<>(ErrorResponse, HttpStatus.BAD_REQUEST);
    }

    // Xử lý các Exception khác
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
            Exception ex, WebRequest request) {

        ErrorResponse ErrorResponse = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Đã xảy ra lỗi không mong muốn",
                request.getDescription(false));

        return new ResponseEntity<>(ErrorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}