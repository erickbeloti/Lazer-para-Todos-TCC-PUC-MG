package com.projetopuc.lazerparatodos.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class ComentarioResponseDto {
    private Integer id;
    private String nome;
    private String comentario;
    private BigDecimal avaliacao;
    private List<DeficienciaResponseDto> deficiencias;
}
