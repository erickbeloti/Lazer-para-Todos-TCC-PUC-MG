package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.ProprietarioCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.ProprietarioCreateResponseDto;
import com.projetopuc.lazerparatodos.entities.Deficiencia;
import com.projetopuc.lazerparatodos.entities.Proprietario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProprietarioMapper {

    @Mapping(source = "enderecoId", target = "endereco.id")
    @Mapping(source = "email", target = "usuario.email")
    @Mapping(source = "senha", target = "usuario.senha")
    @Mapping(target = "usuario.papel", expression = "java(\"proprietario\")")
    @Mapping(source = "deficienciasIds", target = "deficiencias")
    Proprietario toProprietario(ProprietarioCreateRequestDto proprietarioCreateRequestDto);
    Deficiencia toDeficiencia(Integer id);

    @Mapping(source = "usuario.email", target = "email")
    ProprietarioCreateResponseDto toProprietarioCreateResponseDto(Proprietario proprietario);
}
