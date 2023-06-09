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
public class EnderecoResponseDto {
    private Integer id;
    private String estado;
    private String cidade;
    private String bairro;
}
