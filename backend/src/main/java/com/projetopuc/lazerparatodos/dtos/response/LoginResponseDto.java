package com.projetopuc.lazerparatodos.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class LoginResponseDto {
    private Usuario usuario;
    private String accessToken;

    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Setter
    @Getter
    public static class Usuario {
        private Integer id;
        private String nome;
        private String email;
        private String papel;
    }
}
