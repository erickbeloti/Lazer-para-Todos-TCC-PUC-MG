package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.ProprietarioCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.request.ProprietarioUpdateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.ProprietarioCreateResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.ProprietarioResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.ProprietarioSummaryResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.ProprietarioUpdateResponseDto;
import com.projetopuc.lazerparatodos.entities.Deficiencia;
import com.projetopuc.lazerparatodos.entities.Endereco;
import com.projetopuc.lazerparatodos.entities.Proprietario;
import com.projetopuc.lazerparatodos.repositories.ComentarioRepository;
import com.projetopuc.lazerparatodos.repositories.DeficienciaRepository;
import com.projetopuc.lazerparatodos.repositories.EnderecoRepository;
import com.projetopuc.lazerparatodos.repositories.ProprietarioRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
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
    private ComentarioRepository comentarioRepository;

    @Autowired
    private ProprietarioMapper proprietarioMapper;

    @PersistenceContext
    private EntityManager entityManager;

    public ProprietarioCreateResponseDto create(ProprietarioCreateRequestDto proprietarioCreateRequestDto) {
        Proprietario proprietario = proprietarioMapper.toProprietario(proprietarioCreateRequestDto);

        Endereco endereco = enderecoRepository.findById(proprietario.getEndereco().getId()).orElseThrow(() -> new RuntimeException("Endereço não encontrado"));

        List<Deficiencia> deficienciaList = proprietario.getDeficiencias().stream().map(deficiencia -> deficienciaRepository.findById(deficiencia.getId()).orElseThrow(() -> new RuntimeException("Deficiência não encontrada"))).toList();

        Proprietario savedProprietario = proprietarioRepository.save(proprietario);
        savedProprietario.setEndereco(endereco);
        savedProprietario.setDeficiencias(deficienciaList);

        return proprietarioMapper.toProprietarioCreateResponseDto(savedProprietario);
    }

    @Transactional
    public ProprietarioUpdateResponseDto update(ProprietarioUpdateRequestDto proprietarioUpdateRequestDto, Integer id){
        Proprietario existingProprietario = proprietarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Proprietário não encontrado"));
        Proprietario proprietario = proprietarioMapper.toProprietario(proprietarioUpdateRequestDto, existingProprietario);

        entityManager.clear();

        Endereco endereco = enderecoRepository.findById(proprietario.getEndereco().getId()).orElseThrow(() -> new RuntimeException("Endereço não encxontrado"));
        List<Deficiencia> deficienciaList = proprietario.getDeficiencias().stream().map(deficiencia -> deficienciaRepository
                .findById(deficiencia.getId()).orElseThrow(() -> new RuntimeException("Deficiência não encontrada"))).toList();

         proprietario.setEndereco(endereco);
         proprietario.setDeficiencias(deficienciaList);

         Proprietario updatedProprietario = proprietarioRepository.save(proprietario);

        return proprietarioMapper.toProprietarioUpdateResponseDto(updatedProprietario);

     }

    public ProprietarioResponseDto findByIdOrElseThrow(Integer id) {
        Proprietario proprietario = proprietarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Proprietário não encontrado"));
        proprietario.setComentarios(comentarioRepository.findAllByProprietarioId(proprietario.getId()));
        proprietario.setAvaliacaoMedia(comentarioRepository.getAvaliacaoMedia(proprietario.getId()));

        List<Deficiencia> deficienciasConfirmadas = deficienciaRepository.findAllById(comentarioRepository.findDistinctByProprietarioId(proprietario.getId()));

        proprietario.getDeficiencias().forEach(deficiencia -> deficiencia.setConfirmada(
                deficienciasConfirmadas.contains(deficiencia)
        ));

        return proprietarioMapper.toProprietarioResponseDto(proprietario);
    }

    public List<ProprietarioSummaryResponseDto> filtroAvancado(String nome, String estado, String cidade, String bairro, BigDecimal avMedia, List<Integer> deficienciasIds) {

        if(deficienciasIds == null){
            deficienciasIds = new ArrayList<>();
        }

         List<Proprietario> proprietariosList = proprietarioRepository.findProprieratioByfilter(nome, estado, cidade, bairro, avMedia, deficienciasIds);

         return proprietarioMapper.toProprietarioSummaryResponseDtoList(proprietariosList);
    }
}
