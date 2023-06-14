package com.projetopuc.lazerparatodos.controllers;

import com.projetopuc.lazerparatodos.dtos.response.BairroResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.CidadeResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.EstadoResponseDto;
import com.projetopuc.lazerparatodos.services.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/enderecos")
public class EnderecoController {
    @Autowired
    private EnderecoService enderecoService;

    @GetMapping(path = "/estados")
    public ResponseEntity<List<EstadoResponseDto>> findAllEstados() {
        return ResponseEntity.ok(enderecoService.findAllEstados());
    }

    @GetMapping(path = "cidades")
    public ResponseEntity<List<CidadeResponseDto>> findAllCidades(@RequestParam String estado) {
        return ResponseEntity.ok(enderecoService.findAllCidades(estado));
    }

    @GetMapping(path = "/bairros")
    public ResponseEntity<List<BairroResponseDto>> findAllBairros(@RequestParam String estado, @RequestParam String cidade) {
        return ResponseEntity.ok(enderecoService.findAllBairros(estado, cidade));
    }
}
