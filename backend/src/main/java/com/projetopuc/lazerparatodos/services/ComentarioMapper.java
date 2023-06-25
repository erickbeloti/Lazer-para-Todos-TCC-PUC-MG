package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.ComentarioCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.ComentarioResponseDto;
import com.projetopuc.lazerparatodos.entities.Comentario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ComentarioMapper {
    @Mapping(source = "pcd.nome", target = "nome")
        ComentarioResponseDto toComentarioResponseDto(Comentario comentario);

    @Mapping(source = "proprietarioId", target = "proprietario.id")
    @Mapping(source = "pcDId", target = "pcd.id")
    Comentario toComentario(ComentarioCreateRequestDto comentarioCreateRequestDto);

}
