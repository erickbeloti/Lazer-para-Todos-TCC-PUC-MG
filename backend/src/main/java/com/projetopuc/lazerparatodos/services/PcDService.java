package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.dtos.request.PcDCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.request.PcDUpdateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.PcDCreateFavoritoResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.PcDCreateResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.PcDUpdateResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.ProprietarioSummaryResponseDto;
import com.projetopuc.lazerparatodos.dtos.request.PcDCreateFavoritoRequestDto;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public PcDCreateResponseDto create(PcDCreateRequestDto pcDCreateRequestDto){
        PcD pcD = pcDMapper.toPcD(pcDCreateRequestDto);
        pcD.getUsuario().setSenha(passwordEncoder.encode(pcD.getUsuario().getPassword()));

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

    public List<ProprietarioSummaryResponseDto> findAllFavoritos(Integer id){

        Optional<PcD> usuarioPcd = pcdRepository.findAllWithFavoritos(id);

        return proprietarioMapper.toProprietarioSummaryResponseDtoList(usuarioPcd.orElse(PcD.builder().build()).getFavoritos());
    }

    public List<ProprietarioSummaryResponseDto> findFavoritoById(Integer pcDId, Integer proprietarioId){

        Optional<PcD> usuarioPcd = pcdRepository.findFavoritoById(pcDId, proprietarioId);

        return proprietarioMapper.toProprietarioSummaryResponseDtoList(usuarioPcd.orElse(PcD.builder().build()).getFavoritos());
    }


    public List<ProprietarioSummaryResponseDto> findAllSugestoes(Integer id){
        PcD usuarioPcd = pcdRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário PcD não encontrado"));

        String cidade = usuarioPcd.getEndereco().getCidade();

        List<Proprietario> proprietariosSelecionados = proprietarioRepository.findAllByEnderecoCidade(cidade);

        return proprietarioMapper.toProprietarioSummaryResponseDtoList(proprietariosSelecionados);

    }

    public PcDCreateFavoritoResponseDto seguirProprietario (PcDCreateFavoritoRequestDto pcdCreateFavoritoCreateDto, Integer id){
        PcD usuarioPcd = pcdRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário PcD não encontrado"));


        Proprietario proprietarioFavorito = proprietarioRepository.findById(pcdCreateFavoritoCreateDto.getProprietarioId()).
                 orElseThrow(() -> new RuntimeException("Proprietário não encontrado"));

        List<Proprietario> favoritosList = usuarioPcd.getFavoritos();

        favoritosList.add(proprietarioFavorito);

         pcdRepository.save(usuarioPcd);

         return proprietarioMapper.toPcDCreateFavoritoResponseDto(proprietarioFavorito) ;
    }
}
