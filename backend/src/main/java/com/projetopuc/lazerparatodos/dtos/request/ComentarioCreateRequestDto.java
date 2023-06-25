package com.projetopuc.lazerparatodos.dtos.request;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class ComentarioCreateRequestDto {
    private String comentario;
    private BigDecimal avaliacao;
    private Integer proprietarioId;
    private Integer pcDId;
    private List<Integer> deficienciaIds;
}
