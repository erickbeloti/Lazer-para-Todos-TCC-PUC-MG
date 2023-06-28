package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.ComentarioCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.ComentarioResponseDto;
import com.projetopuc.lazerparatodos.entities.Comentario;
import com.projetopuc.lazerparatodos.entities.Deficiencia;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = DeficienciaMapper.class)
public interface ComentarioMapper {
    @Mapping(source = "pcd.nome", target = "nome")
        ComentarioResponseDto toProprietarioCreateResponseDto(Comentario comentario);

    @Mapping(source = "proprietarioId", target = "proprietario.id")
    @Mapping(source = "pcDId", target = "pcd.id")
    @Mapping(source = "deficienciasIds", target = "deficiencias")
    Comentario toComentario(ComentarioCreateRequestDto comentarioCreateRequestDto);
}
