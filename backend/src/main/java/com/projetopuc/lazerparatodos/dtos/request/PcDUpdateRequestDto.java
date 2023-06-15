package com.projetopuc.lazerparatodos.dtos.request;

import com.projetopuc.lazerparatodos.dtos.response.DeficienciaResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.EnderecoResponseDto;
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
public class PcDUpdateRequestDto {
    private String nome;
    private Integer enderecoId;
    private List<Integer> deficienciasIds;
}


