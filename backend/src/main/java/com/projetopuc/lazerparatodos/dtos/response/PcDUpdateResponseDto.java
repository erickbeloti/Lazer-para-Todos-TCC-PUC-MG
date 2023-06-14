package com.projetopuc.lazerparatodos.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class PcDUpdateResponseDto {
    private Integer id;
    private String nome;
    private String email;
    private EnderecoResponseDto endereco;
    private List<DeficienciaResponseDto> deficiencias;
}

