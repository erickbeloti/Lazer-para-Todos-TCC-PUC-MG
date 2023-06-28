package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.ComentarioCreateRequestDto;
import com.projetopuc.lazerparatodos.entities.Comentario;
import com.projetopuc.lazerparatodos.entities.Deficiencia;
import com.projetopuc.lazerparatodos.entities.PcD;
import com.projetopuc.lazerparatodos.repositories.ComentarioRepository;
import com.projetopuc.lazerparatodos.repositories.DeficienciaRepository;
import com.projetopuc.lazerparatodos.repositories.PcDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;


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


    @Transactional
    public Comentario create(ComentarioCreateRequestDto comentarioCreateRequestDto){
        Comentario comentario = comentarioMapper.toComentario(comentarioCreateRequestDto);

        PcD pcd = pcDRepository.findById(comentario.getPcd().getId()).orElseThrow(() -> new RuntimeException("Usuário PcD não encontrado"));
        comentario.setPcd(pcd);

        List<Deficiencia> deficienciaList = comentarioCreateRequestDto.getDeficienciasIds().stream().map(deficienciasId -> deficienciaRepository
                .findById(deficienciasId).orElseThrow(() -> new RuntimeException("Deficiência não encontrada"))).toList();

        comentario.setDeficiencias(deficienciaList);

         return  comentarioRepository.save(comentario);
    }

}


