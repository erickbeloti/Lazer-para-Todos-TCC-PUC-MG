package com.projetopuc.lazerparatodos.repositories;

import com.projetopuc.lazerparatodos.entities.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    @Query("SELECT c FROM Comentario c" +
            " LEFT JOIN FETCH c.deficiencias d" +
            " LEFT JOIN FETCH c.pcd" +
            " WHERE c.proprietario.id = :proprietarioId")
    List<Comentario> findAllByProprietarioId(Integer proprietarioId);

    @Query("SELECT avg(c.avaliacao) FROM Comentario c WHERE c.proprietario.id = :proprietarioId")
    BigDecimal getAvaliacaoMedia(Integer proprietarioId);

    @Query("SELECT distinct(d.id) FROM Comentario c" +
            " LEFT JOIN c.deficiencias d" +
            " WHERE c.proprietario.id = :proprietarioId")
    List<Integer> findDistinctByProprietarioId(Integer proprietarioId);
}