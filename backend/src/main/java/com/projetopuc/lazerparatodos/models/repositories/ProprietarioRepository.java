package com.projetopuc.lazerparatodos.models.repositories;

import com.projetopuc.lazerparatodos.models.entities.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;



public interface ProprietarioRepository extends JpaRepository<Proprietario, Integer> {
}
