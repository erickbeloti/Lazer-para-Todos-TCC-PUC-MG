package com.projetopuc.lazerparatodos.controllers;

import com.projetopuc.lazerparatodos.dtos.request.ComentarioCreateRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.ComentarioResponseDto;
import com.projetopuc.lazerparatodos.entities.Comentario;
import com.projetopuc.lazerparatodos.services.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/comentarios")
public class ComentarioController {

    @Autowired
    ComentarioService comentarioService;

    @PostMapping
    public ResponseEntity<Comentario> saveComentario(@RequestBody ComentarioCreateRequestDto comentarioCreateRequestDto) {
        Comentario createdComentario = comentarioService.create(comentarioCreateRequestDto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdComentario.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdComentario);
    }

}
