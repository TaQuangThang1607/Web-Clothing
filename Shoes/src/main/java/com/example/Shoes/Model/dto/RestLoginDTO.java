package com.example.Shoes.Model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestLoginDTO {
    private String accessToken;
    private UserLogin user;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserLogin{
        private long id;
        private String email;
        private String fullName;
    }
    
}
