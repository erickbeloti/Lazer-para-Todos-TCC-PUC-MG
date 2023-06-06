package com.projetopuc.lazerparatodos.models.repositories;

import com.projetopuc.lazerparatodos.models.entities.Proprietario;
import com.projetopuc.lazerparatodos.models.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    public List<Usuario> findUsuarioByEmail(String email);
}
