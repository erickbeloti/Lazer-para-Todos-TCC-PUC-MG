package com.projetopuc.lazerparatodos.dtos.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class SugestoesResponseDto {
    private Integer id;
    private String nomeEstabelecimento;
    private String urlIcone;
}
