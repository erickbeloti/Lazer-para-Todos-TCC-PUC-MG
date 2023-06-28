package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.ProprietarioCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.request.ProprietarioUpdateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.*;
import com.projetopuc.lazerparatodos.entities.Deficiencia;
import com.projetopuc.lazerparatodos.entities.Proprietario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ComentarioMapper.class, DeficienciaMapper.class})
public interface ProprietarioMapper {

    @Mapping(source = "enderecoId", target = "endereco.id")
    @Mapping(source = "email", target = "usuario.email")
    @Mapping(source = "senha", target = "usuario.senha")
    @Mapping(target = "usuario.papel", expression = "java(\"proprietario\")")
    @Mapping(source = "deficienciasIds", target = "deficiencias")
    Proprietario toProprietario(ProprietarioCreateRequestDto proprietarioCreateRequestDto);

    @Mapping(source = "usuario.email", target = "email")
    ProprietarioCreateResponseDto toProprietarioCreateResponseDto(Proprietario proprietario);

    @Mapping(source = "usuario.email", target = "email")
    ProprietarioResponseDto toProprietarioResponseDto(Proprietario proprietario);

    @Mapping(source = "enderecoId", target = "endereco.id")
    @Mapping(source = "deficienciasIds", target = "deficiencias")
    Proprietario toProprietario(ProprietarioUpdateRequestDto proprietarioUpdateRequestDto,
                                @MappingTarget Proprietario existingProprietario);
    @Mapping(source = "usuario.email", target = "email")
    ProprietarioUpdateResponseDto toProprietarioUpdateResponseDto(Proprietario proprietario);

    List<FavoritosResponseDto> toFavoritosResponseDtoList(List<Proprietario> proprietarios);

    List<SugestoesResponseDto> toSugestoesResponseDtoList(List<Proprietario> proprietarios);
}
