package com.projetopuc.lazerparatodos.controllers;

import com.projetopuc.lazerparatodos.dtos.response.DeficienciaResponseDto;
import com.projetopuc.lazerparatodos.services.DeficienciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/deficiencias")
public class DeficienciaController {

    @Autowired
    private DeficienciaService deficienciaService;

    @GetMapping
    public ResponseEntity<List<DeficienciaResponseDto>> findAll() {
        return ResponseEntity.ok(deficienciaService.findAll());
    }
}
