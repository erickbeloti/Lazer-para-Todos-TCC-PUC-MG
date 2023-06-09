package com.projetopuc.lazerparatodos.controllers;

import com.projetopuc.lazerparatodos.entities.Usuario;
import com.projetopuc.lazerparatodos.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @PostMapping
    public @ResponseBody Usuario saveUsuario(Usuario usuario ){
        usuarioRepository.save(usuario);
        return usuario;
    }

    @GetMapping
    public List<Usuario> getallUsuarios(){
        return usuarioRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<Usuario> getUsuarioById(@PathVariable int id){
        return usuarioRepository.findById(id);
    }

    @GetMapping(path = "/filter/{email}")
    public List<Usuario> findUsuarioByEmail(@PathVariable String email){
        return usuarioRepository.findUsuarioByEmail(email);
    }


    @PutMapping(path = "/{id}")
    public @ResponseBody Usuario updateUsuario(Usuario usuario){
        usuarioRepository.save(usuario);
        return usuario;
    }

    @DeleteMapping(path = "/{id}")
    public @ResponseBody Usuario deleteUsuarioById(Usuario usuario){
        usuarioRepository.delete(usuario);
        return usuario;
    }

    @Autowired
    UsuarioRepository usuarioRepository;
}