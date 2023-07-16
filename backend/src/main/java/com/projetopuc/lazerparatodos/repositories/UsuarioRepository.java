package com.projetopuc.lazerparatodos.repositories;

import com.projetopuc.lazerparatodos.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findUsuarioByEmail(String email);
}
