package com.example.Shoes.Model.dto;

import com.example.Shoes.Model.Role;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestLoginDTO {
    @JsonProperty("access_token")
    private String accessToken;
    private UserLogin user;
    

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserLogin{
        private long id;
        private String email;
        private String fullName;
        private long role;
    
    }


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserGetAccount{
        private UserLogin user;
    }
    
}
