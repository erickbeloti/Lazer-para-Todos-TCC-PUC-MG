package com.projetopuc.lazerparatodos.models.repositories;

import com.projetopuc.lazerparatodos.models.entities.Pcd;
import com.projetopuc.lazerparatodos.models.entities.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PcdRepository  extends JpaRepository<Pcd, Integer> {

    public List<Proprietario> findPcdByNome(String nome);
}
