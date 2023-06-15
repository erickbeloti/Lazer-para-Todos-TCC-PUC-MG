package com.projetopuc.lazerparatodos.dtos.response;


import lombok.*;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class ProprietarioUpdateResponseDto {
    private Integer id;
    private String nomeEstabelecimento;
    private String email;
    private String logradouro;
    private EnderecoResponseDto endereco;
    private String telefone;
    private List<DeficienciaResponseDto> deficiencias;
    private String descricao;
}



