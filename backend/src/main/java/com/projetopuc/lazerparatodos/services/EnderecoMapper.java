package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.response.BairroResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.CidadeResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.EstadoResponseDto;
import com.projetopuc.lazerparatodos.entities.Endereco;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EnderecoMapper {
    List<EstadoResponseDto> toEnderecoResponseDtoList(List<String> estados);
    EstadoResponseDto toEstadoResponseDto(String estado);

    List<CidadeResponseDto> toCidadeResponseDtoList(List<String> cidades);
    CidadeResponseDto toCidadeResponseDto(String cidade);

    List<BairroResponseDto> toBairroResponseDtoList(List<Endereco> enderecos);
    @Mapping(source = "id", target = "enderecoId")
    BairroResponseDto toBairroResponseDto(Endereco endereco);
}
