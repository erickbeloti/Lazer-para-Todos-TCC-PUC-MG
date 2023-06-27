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
public class ProprietarioResponseDto {
    private Integer id;
    private String nomeEstabelecimento;
    private String email;
    private String logradouro;
    private EnderecoResponseDto endereco;
    private String telefone;
    private List<DeficienciaConfirmadaResponseDto> deficiencias;
    private String descricao;
    private String urlIcone;
    private List<ImagemResponseDto> imagens;
    private BigDecimal avaliacaoMedia;
    private List<ComentarioResponseDto> comentarios;

    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Setter
    @Getter
    public static class DeficienciaConfirmadaResponseDto {
        private DeficienciaResponseDto deficiencia;
        private boolean confirmada;
    }
}
