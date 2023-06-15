package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.response.DeficienciaResponseDto;
import com.projetopuc.lazerparatodos.repositories.DeficienciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeficienciaService {
    @Autowired
    private DeficienciaRepository deficienciaRepository;

    @Autowired
    private DeficienciaMapper deficienciaMapper;

    public List<DeficienciaResponseDto> findAll() {
        return deficienciaMapper.toDeficienciaResponseDtoList(deficienciaRepository.findAll());
    }
}
