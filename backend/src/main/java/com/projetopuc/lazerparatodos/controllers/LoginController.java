package com.projetopuc.lazerparatodos.controllers;

import com.projetopuc.lazerparatodos.dtos.request.LoginRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.LoginResponseDto;
import com.projetopuc.lazerparatodos.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/login")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        LoginResponseDto loginResponseDto = loginService.autenticar(loginRequestDto);

        return ResponseEntity.ok(loginResponseDto);
    }
}
