package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.PcDCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.PcDCreateResponseDto;
import com.projetopuc.lazerparatodos.entities.Deficiencia;
import com.projetopuc.lazerparatodos.entities.PcD;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PcDMapper {

    @Mapping(source = "enderecoId", target = "endereco.id")
    @Mapping(source = "email", target = "usuario.email")
    @Mapping(source = "senha", target = "usuario.senha")
    @Mapping(target = "usuario.papel", expression = "java(\"pcd\")")
    @Mapping(source = "deficienciasIds", target = "deficiencias")
    PcD toPcD(PcDCreateRequestDto pcDCreateRequestDto);
    Deficiencia toDeficiencia(Integer id);

    @Mapping(source = "usuario.email", target = "email")
    PcDCreateResponseDto toPcDCreateResponseDto(PcD pcD);
}
