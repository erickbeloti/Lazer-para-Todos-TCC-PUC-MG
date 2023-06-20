package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.PcDCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.request.PcDUpdateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.FavoritosResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.PcDCreateResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.PcDUpdateResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.SugestoesResponseDto;
import com.projetopuc.lazerparatodos.entities.Deficiencia;
import com.projetopuc.lazerparatodos.entities.Endereco;
import com.projetopuc.lazerparatodos.entities.PcD;
import com.projetopuc.lazerparatodos.entities.Proprietario;
import com.projetopuc.lazerparatodos.repositories.DeficienciaRepository;
import com.projetopuc.lazerparatodos.repositories.EnderecoRepository;
import com.projetopuc.lazerparatodos.repositories.PcDRepository;
import com.projetopuc.lazerparatodos.repositories.ProprietarioRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    @Autowired
    private ProprietarioRepository proprietarioRepository;

    @Autowired
    private ProprietarioMapper proprietarioMapper;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public PcDCreateResponseDto create(PcDCreateRequestDto pcDCreateRequestDto){
        PcD pcD = pcDMapper.toPcD(pcDCreateRequestDto);

        Endereco endereco = enderecoRepository.findById(pcD.getEndereco().getId()).orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
        List<Deficiencia> deficienciaList = pcD.getDeficiencias().stream().map(deficiencia -> deficienciaRepository.findById(deficiencia.getId()).orElseThrow(() -> new RuntimeException("Deficiência não encontrada"))).toList();
        pcD.setEndereco(endereco);
        pcD.setDeficiencias(deficienciaList);

        PcD savedPcD = pcdRepository.save(pcD);
        return pcDMapper.toPcDCreateResponseDto(savedPcD);
    }

    @Transactional
    public PcDUpdateResponseDto update(PcDUpdateRequestDto pcDUpdateRequestDto, Integer id){
        PcD existingPcD = pcdRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário PcD não encontrado"));
        PcD pcD = pcDMapper.toPcD(pcDUpdateRequestDto, existingPcD);

        entityManager.clear();

        Endereco endereco = enderecoRepository.findById(pcD.getEndereco().getId()).orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
        List<Deficiencia> deficienciaList = pcD.getDeficiencias().stream().map(deficiencia -> deficienciaRepository.findById(deficiencia.getId()).orElseThrow(() -> new RuntimeException("Deficiência não encontrada"))).toList();
        pcD.setEndereco(endereco);
        pcD.setDeficiencias(deficienciaList);

        PcD updatedPcD = pcdRepository.save(pcD);

        return pcDMapper.toPcDUpdateResponseDto(updatedPcD);
    }

    public PcDCreateResponseDto findByIdOrElseThrow(Integer id) {
        PcD pcD = pcdRepository.findById(id).orElseThrow(() -> new RuntimeException("PcD não encontrado"));
        return pcDMapper.toPcDCreateResponseDto(pcD);
    }

    public List<FavoritosResponseDto> findAllFavoritos(Integer id){

        PcD usuarioPcd = pcdRepository.findAllWithFavoritos(id);

        return proprietarioMapper.toFavoritosResponseDtoList(usuarioPcd.getFavoritos());
    }

    public List<SugestoesResponseDto> findAllSugestoes(Integer id){
        PcD usuarioPcd = pcdRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário PcD não encontrado"));

        String cidade = usuarioPcd.getEndereco().getCidade();

        List<Proprietario> proprietariosSelecionados = proprietarioRepository.findProprietariosByCidade(cidade);

        return proprietarioMapper.toSugestoesResponseDtoList(proprietariosSelecionados);

    }

}
