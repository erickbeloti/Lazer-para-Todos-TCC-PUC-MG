package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.response.BairroResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.CidadeResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.EstadoResponseDto;
import com.projetopuc.lazerparatodos.repositories.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnderecoService {
    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private EnderecoMapper enderecoMapper;

    public List<EstadoResponseDto> findAllEstados(){
        return enderecoMapper.toEnderecoResponseDtoList(enderecoRepository.findAllEstados());
    }

    public List<CidadeResponseDto> findAllCidades(String estado){
        return enderecoMapper.toCidadeResponseDtoList(enderecoRepository.findAllCidadesDistinctByEstado(estado.toUpperCase()));
    }

    public List<BairroResponseDto> findAllBairros(String estado, String cidade){
        return enderecoMapper.toBairroResponseDtoList(enderecoRepository.findAllByEstadoAndCidade(estado, cidade));
    }
}
