package com.projetopuc.lazerparatodos.dtos.request;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class ProprietarioUpdateRequestDto {
    private String nomeEstabelecimento;
    private String logradouro;
    private Integer enderecoId;
    private String telefone;
    private List<Integer> deficienciasIds;
    private String descricao;
}
