package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.response.DeficienciaResponseDto;
import com.projetopuc.lazerparatodos.entities.Deficiencia;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DeficienciaMapper {
    List<DeficienciaResponseDto> toDeficienciaResponseDtoList(List<Deficiencia> deficiencias);
}
