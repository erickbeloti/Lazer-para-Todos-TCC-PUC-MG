package com.projetopuc.lazerparatodos.controller;

import com.projetopuc.lazerparatodos.models.entities.Pcd;
import com.projetopuc.lazerparatodos.models.entities.Proprietario;
import com.projetopuc.lazerparatodos.models.repositories.PcdRepository;
import com.projetopuc.lazerparatodos.models.repositories.ProprietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pcds")
public class PcdController {

    @PostMapping
    public @ResponseBody Pcd savePcd(Pcd pcd){
        pcdRepository.save(pcd);
        return pcd;
    }

    @GetMapping
    public List<Pcd> getallPcd(){
        return pcdRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<Pcd> getPcdById(@PathVariable int id){
        return pcdRepository.findById(id);
    }

    @GetMapping(path = "/filter/{nome}")
    public List<Proprietario> getPcdbyNome(@PathVariable String nome){
        return pcdRepository.findPcdByNome(nome);
    }

    @PutMapping(path = "/{id}")
    public @ResponseBody Pcd updatePcd(Pcd pcd){
        pcdRepository.save(pcd);
        return pcd;
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody Pcd deletePcdById(Pcd pcd){
        pcdRepository.delete(pcd);
        return pcd;
    }

    @Autowired
    PcdRepository pcdRepository;
}