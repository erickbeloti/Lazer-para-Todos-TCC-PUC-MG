package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.ProprietarioCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.ProprietarioCreateResponseDto;
import com.projetopuc.lazerparatodos.entities.Deficiencia;
import com.projetopuc.lazerparatodos.entities.Endereco;
import com.projetopuc.lazerparatodos.entities.Proprietario;
import com.projetopuc.lazerparatodos.repositories.DeficienciaRepository;
import com.projetopuc.lazerparatodos.repositories.EnderecoRepository;
import com.projetopuc.lazerparatodos.repositories.ProprietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProprietarioService {
    @Autowired
    private ProprietarioRepository proprietarioRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private DeficienciaRepository deficienciaRepository;

    @Autowired
    private ProprietarioMapper proprietarioMapper;

    public ProprietarioCreateResponseDto create(ProprietarioCreateRequestDto proprietarioCreateRequestDto) {
        Proprietario proprietario = proprietarioMapper.toProprietario(proprietarioCreateRequestDto);

        Endereco endereco = enderecoRepository.findById(proprietario.getEndereco().getId()).orElseThrow(() -> new RuntimeException("Endereço não encontrado"));

        List<Deficiencia> deficienciaList = proprietario.getDeficiencias().stream().map(deficiencia -> deficienciaRepository.findById(deficiencia.getId()).orElseThrow(() -> new RuntimeException("Deficiência não encontrada"))).toList();

        Proprietario savedProprietario = proprietarioRepository.save(proprietario);
        savedProprietario.setEndereco(endereco);
        savedProprietario.setDeficiencias(deficienciaList);

        return proprietarioMapper.toProprietarioCreateResponseDto(savedProprietario);
    }

    public ProprietarioCreateResponseDto findByIdOrElseThrow(Integer id) {
        Proprietario proprietario = proprietarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Proprietário não encontrado"));
        return proprietarioMapper.toProprietarioCreateResponseDto(proprietario);
    }
}
