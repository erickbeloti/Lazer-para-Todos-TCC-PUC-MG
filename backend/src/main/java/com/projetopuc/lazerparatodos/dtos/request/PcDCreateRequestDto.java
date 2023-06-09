package com.projetopuc.lazerparatodos.dtos.request;

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
public class PcDCreateRequestDto {
    private String nome;
    private String email;
    private String senha;
    private Integer enderecoId;
    private List<Integer> deficienciasIds;
}
