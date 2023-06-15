package com.projetopuc.lazerparatodos.controllers;

import com.projetopuc.lazerparatodos.dtos.request.PcDCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.request.PcDUpdateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.PcDCreateResponseDto;
import com.projetopuc.lazerparatodos.dtos.response.PcDUpdateResponseDto;
import com.projetopuc.lazerparatodos.entities.PcD;
import com.projetopuc.lazerparatodos.repositories.PcDRepository;
import com.projetopuc.lazerparatodos.services.PcDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/pcds")
public class PcDController {

    @Autowired
    private PcDService pcDService;

    @PostMapping
    public ResponseEntity<PcDCreateResponseDto> savePcD(@RequestBody PcDCreateRequestDto pcDCreateRequestDto){
        PcDCreateResponseDto createdPcD = pcDService.create(pcDCreateRequestDto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdPcD.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdPcD);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<PcDUpdateResponseDto> updatePcD(@RequestBody PcDUpdateRequestDto pcDUpdateRequestDto, @PathVariable Integer id) {
        return ResponseEntity.ok(pcDService.update(pcDUpdateRequestDto, id));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<PcDCreateResponseDto> getPcdById(@PathVariable Integer id) {
        return ResponseEntity.ok(pcDService.findByIdOrElseThrow(id));
    }

    @GetMapping
    public List<PcD> getallPcd(){
        return pcdRepository.findAll();
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody
    PcD deletePcdById(PcD pcd){
        pcdRepository.delete(pcd);
        return pcd;
    }

    @Autowired
    PcDRepository pcdRepository;
}