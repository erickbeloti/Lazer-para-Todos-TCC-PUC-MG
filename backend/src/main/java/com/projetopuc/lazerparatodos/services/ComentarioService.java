package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.ComentarioCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.ComentarioResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.DeficienciaResponseDto;
import com.projetopuc.lazerparatodos.entities.Comentario;
import com.projetopuc.lazerparatodos.entities.Deficiencia;
import com.projetopuc.lazerparatodos.entities.PcD;
import com.projetopuc.lazerparatodos.repositories.ComentarioRepository;
import com.projetopuc.lazerparatodos.repositories.DeficienciaRepository;
import com.projetopuc.lazerparatodos.repositories.PcDRepository;
import com.projetopuc.lazerparatodos.repositories.ProprietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ComentarioService {

    @Autowired
    ComentarioMapper comentarioMapper;

    @Autowired
    ComentarioRepository comentarioRepository;

    @Autowired
    PcDRepository pcDRepository;

    @Autowired
    DeficienciaRepository deficienciaRepository;

    @Autowired
    ProprietarioRepository proprietarioRepository;

    @Transactional
    public Comentario create(ComentarioCreateRequestDto comentarioCreateRequestDto){
        Comentario comentario = comentarioMapper.toComentario(comentarioCreateRequestDto);

        PcD pcd = pcDRepository.findById(comentario.getPcd().getId()).orElseThrow(() -> new RuntimeException("Usuário PcD não encontrado"));
        comentario.setPcd(pcd);

        List<Deficiencia> deficiencias = new ArrayList<>();

        for (Integer deficienciaId : comentarioCreateRequestDto.getDeficienciasIds()){
            Deficiencia deficiencia = deficienciaRepository.findById(deficienciaId).stream().findFirst().get();
            deficiencias.add(deficiencia);
        }
        comentario.setDeficiencias(deficiencias);

        Comentario savedComentario = comentarioRepository.save(comentario);

        return savedComentario;
    }

}


