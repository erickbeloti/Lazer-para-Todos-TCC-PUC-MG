package com.projetopuc.lazerparatodos.repositories;

import com.projetopuc.lazerparatodos.entities.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    @Query("SELECT c FROM Comentario c" +
            " LEFT JOIN FETCH c.deficiencias d" +
            " LEFT JOIN FETCH c.pcd" +
            " WHERE c.proprietario.id = :proprietarioId")
    List<Comentario> findAllByProprietarioId(Integer proprietarioId);
}