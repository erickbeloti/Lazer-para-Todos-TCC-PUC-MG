package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.ProprietarioCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.request.ProprietarioUpdateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.FavoritosResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.PcDUpdateResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.ProprietarioCreateResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.ProprietarioUpdateResponseDto;
import com.projetopuc.lazerparatodos.entities.Deficiencia;
import com.projetopuc.lazerparatodos.entities.PcD;
import com.projetopuc.lazerparatodos.entities.Proprietario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

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

    @Mapping(source = "enderecoId", target = "endereco.id")
    @Mapping(source = "deficienciasIds", target = "deficiencias")
    Proprietario toProprietario(ProprietarioUpdateRequestDto proprietarioUpdateRequestDto,
                                @MappingTarget Proprietario existingProprietario);
    @Mapping(source = "usuario.email", target = "email")
    ProprietarioUpdateResponseDto toProprietarioUpdateResponseDto(Proprietario proprietario);

    List<FavoritosResponseDto> toFavoritosResponseDtoList(List<Proprietario> proprietarios);
}
