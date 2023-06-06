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
    public List<Proprietario> getProprietariosbyNome(@PathVariable String nome){
        return proprietarioRepository.findBynomeEstabelecimento(nome);
    }

    @GetMapping(path = "/filteravancado")
    public List<Proprietario>getProprietarioFiltroAvancado(@RequestParam(required = false) String nome,
                                                           @RequestParam(required = false) String estado,
                                                           @RequestParam(required = false) String bairro,
                                                           @RequestParam(required = false) String cidade){
        return proprietarioRepository.findProprieratioByfilter(nome, estado, bairro, cidade);
    }

    @PutMapping(path = "/{id}")
    public @ResponseBody Proprietario updateProprietario(Proprietario proprietario){

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

    @DeleteMapping(path = "/{id}")
    public @ResponseBody Proprietario deleteProprietarioById(Proprietario proprietario){
        proprietarioRepository.delete(proprietario);
        return proprietario;
    }

    @Autowired
    ProprietarioRepository proprietarioRepository;
}