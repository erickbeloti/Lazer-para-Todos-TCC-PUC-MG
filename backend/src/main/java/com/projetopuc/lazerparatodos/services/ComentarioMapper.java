package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.response.ComentarioResponseDto;
import com.projetopuc.lazerparatodos.entities.Comentario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ComentarioMapper {
    @Mapping(source = "pcd.nome", target = "nome")
    ComentarioResponseDto toProprietarioCreateResponseDto(Comentario comentario);
}
