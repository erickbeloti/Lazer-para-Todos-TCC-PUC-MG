package com.projetopuc.lazerparatodos.repositories;

import com.projetopuc.lazerparatodos.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    List<Usuario> findUsuarioByEmail(String email);
}
