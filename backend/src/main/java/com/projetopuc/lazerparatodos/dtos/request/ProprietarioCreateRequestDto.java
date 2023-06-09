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
public class ProprietarioCreateRequestDto {
    private String nomeEstabelecimento;
    private String email;
    private String senha;
    private String logradouro;
    private Integer enderecoId;
    private String telefone;
    private List<Integer> deficienciasIds;
    private String descricao;
}
