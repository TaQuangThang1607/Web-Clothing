package com.example.Shoes.exception;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ErrorResponse {
    private int status;
    private String message;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;
    private String path;
    private List<String> errors = new ArrayList<>();

    public ErrorResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public ErrorResponse(int status, String message, String path) {
        this();
        this.status = status;
        this.message = message;
        this.path = path;
    }

    public void addError(String error) {
        this.errors.add(error);
    }

    // Getters and setters
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }
}