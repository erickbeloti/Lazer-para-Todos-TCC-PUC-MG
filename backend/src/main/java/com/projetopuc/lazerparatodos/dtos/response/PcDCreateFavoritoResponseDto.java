package com.projetopuc.lazerparatodos.dtos.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class PcDCreateFavoritoResponseDto {
    Integer id;
    String nomeEstabelecimento;
}
