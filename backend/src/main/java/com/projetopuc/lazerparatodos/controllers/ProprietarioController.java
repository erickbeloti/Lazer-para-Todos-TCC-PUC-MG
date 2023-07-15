package com.projetopuc.lazerparatodos.controllers;

import com.projetopuc.lazerparatodos.dtos.request.ProprietarioCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.request.ProprietarioUpdateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.ProprietarioCreateResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.ProprietarioResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.ProprietarioSummaryResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.ProprietarioUpdateResponseDto;
import com.projetopuc.lazerparatodos.entities.Proprietario;
import com.projetopuc.lazerparatodos.repositories.ProprietarioRepository;
import com.projetopuc.lazerparatodos.services.ProprietarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.math.BigDecimal;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/proprietarios")
public class ProprietarioController {
    @Autowired
    ProprietarioRepository proprietarioRepository;

    @Autowired
    private ProprietarioService proprietarioService;

    @PostMapping
    public ResponseEntity<ProprietarioCreateResponseDto> saveProprietario(@RequestBody ProprietarioCreateRequestDto proprietarioCreateRequestDto) {
        ProprietarioCreateResponseDto createdProprietario = proprietarioService.create(proprietarioCreateRequestDto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdProprietario.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdProprietario);
    }
    @PutMapping(path = "/{id}")
    public ResponseEntity<ProprietarioUpdateResponseDto> updateProprietario(@RequestBody ProprietarioUpdateRequestDto proprietarioUpdateRequestDto, @PathVariable Integer id) {
        return ResponseEntity.ok(proprietarioService.update(proprietarioUpdateRequestDto, id));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ProprietarioResponseDto> getProprietarioById(@PathVariable int id) {
        return ResponseEntity.ok(proprietarioService.findByIdOrElseThrow(id));
    }

    @GetMapping
    public List<Proprietario> getallProprietarios() {
        return proprietarioRepository.findAll();
    }

    @GetMapping(path = "/filter/{nome}")
    public List<Proprietario> getProprietariosbyNome(@PathVariable String nome) {
        return proprietarioRepository.findBynomeEstabelecimento(nome);
    }

    @GetMapping(path = "/filtroavancado")
    public ResponseEntity<List<ProprietarioSummaryResponseDto>> getProprietarioFiltroAvancado(@RequestParam(required = false) String nome,
                                                                              @RequestParam(required = false) String estado,
                                                                              @RequestParam(required = false) String cidade,
                                                                              @RequestParam(required = false) String bairro,
                                                                              @RequestParam(required = false) BigDecimal avMedia,
                                                                              @RequestParam(required = false) List<Integer> deficienciasIds) {

        return ResponseEntity.ok(proprietarioService.filtroAvancado(nome, estado, cidade, bairro,  avMedia, deficienciasIds));
    }

    @DeleteMapping(path = "/{id}")
    public  @ResponseBody
    Proprietario deleteProprietarioById(Proprietario proprietario) {
        proprietarioRepository.delete(proprietario);
        return proprietario;
    }
}