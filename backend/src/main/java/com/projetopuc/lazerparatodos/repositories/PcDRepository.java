package com.projetopuc.lazerparatodos.repositories;

import com.projetopuc.lazerparatodos.entities.PcD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PcDRepository extends JpaRepository<PcD, Integer> {
    @Query("SELECT p FROM PcD p LEFT JOIN FETCH p.favoritos WHERE p.id = :id")
    Optional<PcD> findAllWithFavoritos(Integer id);

    @Query("SELECT p FROM PcD p LEFT JOIN FETCH p.favoritos f WHERE p.id = :pcDId AND f.id = :proprietarioId")
    Optional<PcD> findFavoritoById(Integer pcDId, Integer proprietarioId);

    Optional<PcD> findByUsuarioId(Integer usuarioId);
}
