package com.example.demo.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String username;
    private String password;
    private String roles; // Optional, default to USER if null
}
