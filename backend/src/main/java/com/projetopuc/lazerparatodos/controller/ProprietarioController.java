package com.projetopuc.lazerparatodos.controller;

import com.projetopuc.lazerparatodos.models.entities.Proprietario;
import com.projetopuc.lazerparatodos.models.repositories.ProprietarioRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/proprietarios")
public class ProprietarioController {

    @PostMapping
    public @ResponseBody Proprietario saveProprietario(Proprietario proprietario){
        proprietarioRepository.save(proprietario);
        return proprietario;
    }

    @GetMapping
    public List<Proprietario> getallProprietarios(){
        return proprietarioRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<Proprietario> getProprietarioById(@PathVariable int id){
        return proprietarioRepository.findById(id);
    }

    @GetMapping(path = "/filter/{nome}")
    public List<Proprietario> getProprietariosbyName(@PathVariable String nome){
        return proprietarioRepository.findBynomeEstabelecimento(nome);
    }

    @GetMapping(path = "/filteravancado/{nome}/{local}")
    public List<Proprietario>getProprietarioFiltroAvancado(@PathVariable String nome, @PathVariable String local){
        return proprietarioRepository.findProprieratioByfilter(nome, local);
    }

    @PutMapping(path = "/{id}")
    public @ResponseBody Proprietario updateProprietario(Proprietario proprietario){
        proprietarioRepository.save(proprietario);
        return proprietario;
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody Proprietario deleteProprietario(Proprietario proprietario){
        proprietarioRepository.delete(proprietario);
        return proprietario;
    }

    @Autowired
    ProprietarioRepository proprietarioRepository;
}