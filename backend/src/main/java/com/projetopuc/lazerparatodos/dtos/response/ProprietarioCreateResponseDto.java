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
public class ProprietarioCreateResponseDto {
    private Integer id;
    private String nomeEstabelecimento;
    private String email;
    private String logradouro;
    private EnderecoResponseDto endereco;
    private String telefone;
    private List<DeficienciaResponseDto> deficiencias;
    private String descricao;
}
