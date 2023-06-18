package com.projetopuc.lazerparatodos.repositories;

import com.projetopuc.lazerparatodos.entities.PcD;
import com.projetopuc.lazerparatodos.entities.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PcDRepository extends JpaRepository<PcD, Integer> {
    @Query("SELECT p FROM PcD p JOIN FETCH p.favoritos WHERE p.id = :id")
    PcD findAllWithFavoritos(Integer id);

}
