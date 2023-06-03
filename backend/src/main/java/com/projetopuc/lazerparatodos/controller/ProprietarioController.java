package com.projetopuc.lazerparatodos.controller;

import com.projetopuc.lazerparatodos.models.entities.Proprietario;
import com.projetopuc.lazerparatodos.models.repositories.ProprietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/proprietarios")
public class ProprietarioController {

    @GetMapping
    public List<Proprietario> getallProprietarios(){
        return proprietarioRepository.findAll();
    }

    /*@GetMapping(path = "/{name}")
    public List<Proprietario> getProprietariosbyName(@PathVariable String name){
        Proprietario proprietario = proprietarioRepository.findBy()

        return null;
    }*/

    @GetMapping(path = "/{id}")
    public Proprietario getProprietarioById(@PathVariable int id){
        Optional<Proprietario> proprietario = proprietarioRepository.findById(id);
            return proprietario.stream().findFirst().get();

    }

    @PostMapping
    public @ResponseBody Proprietario saveProprietario(Proprietario proprietario){
        proprietarioRepository.save(proprietario);
        return proprietario;
    }


    @Autowired
    ProprietarioRepository proprietarioRepository;
}