package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.PcDCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.request.PcDUpdateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.PcDCreateResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.PcDUpdateResponseDto;
import com.projetopuc.lazerparatodos.entities.Papel;
import com.projetopuc.lazerparatodos.entities.PcD;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", imports = Papel.class, uses = DeficienciaMapper.class)
public interface PcDMapper {

    @Mapping(source = "enderecoId", target = "endereco.id")
    @Mapping(source = "email", target = "usuario.email")
    @Mapping(source = "senha", target = "usuario.senha")
    @Mapping(target = "usuario.papel", expression = "java(Papel.PCD)")
    @Mapping(source = "deficienciasIds", target = "deficiencias")
    PcD toPcD(PcDCreateRequestDto pcDCreateRequestDto);

    @Mapping(source = "usuario.email", target = "email")
    PcDCreateResponseDto toPcDCreateResponseDto(PcD pcD);

    @Mapping(source = "enderecoId", target = "endereco.id")
    @Mapping(source = "deficienciasIds", target = "deficiencias")
    PcD toPcD(PcDUpdateRequestDto pcDUpdateRequestDto, @MappingTarget PcD existingPcD);

    @Mapping(source = "usuario.email", target = "email")
    PcDUpdateResponseDto toPcDUpdateResponseDto(PcD pcD);
}
