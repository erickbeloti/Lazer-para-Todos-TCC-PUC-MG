package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.PcDCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.PcDCreateResponseDto;
import com.projetopuc.lazerparatodos.entities.Deficiencia;
import com.projetopuc.lazerparatodos.entities.Endereco;
import com.projetopuc.lazerparatodos.entities.PcD;
import com.projetopuc.lazerparatodos.repositories.DeficienciaRepository;
import com.projetopuc.lazerparatodos.repositories.EnderecoRepository;
import com.projetopuc.lazerparatodos.repositories.PcDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PcDService {
    @Autowired
    private PcDRepository pcdRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private DeficienciaRepository deficienciaRepository;

    @Autowired
    private PcDMapper pcDMapper;

    public PcDCreateResponseDto create(PcDCreateRequestDto pcDCreateRequestDto){
        PcD pcD = pcDMapper.toPcD(pcDCreateRequestDto);

        Endereco endereco = enderecoRepository.findById(pcD.getEndereco().getId()).orElseThrow(() -> new RuntimeException("Endereço não encontrado"));

        List<Deficiencia> deficienciaList = pcD.getDeficiencias().stream().map(deficiencia -> deficienciaRepository.findById(deficiencia.getId()).orElseThrow(() -> new RuntimeException("Deficiência não encontrada"))).toList();

        PcD savedPcD = pcdRepository.save(pcD);
        savedPcD.setEndereco(endereco);
        savedPcD.setDeficiencias(deficienciaList);

        return pcDMapper.toPcDCreateResponseDto(savedPcD);
    }

    public PcDCreateResponseDto findByIdOrElseThrow(Integer id) {
        PcD pcD = pcdRepository.findById(id).orElseThrow(() -> new RuntimeException("PcD não encontrado"));
        return pcDMapper.toPcDCreateResponseDto(pcD);
    }
}
