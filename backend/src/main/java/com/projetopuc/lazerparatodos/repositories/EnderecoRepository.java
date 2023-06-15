package com.projetopuc.lazerparatodos.repositories;

import com.projetopuc.lazerparatodos.entities.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EnderecoRepository extends JpaRepository<Endereco, Integer> {

    @Query("SELECT DISTINCT e.estado FROM Endereco e")
    List<String> findAllEstados();

    @Query("SELECT DISTINCT e.cidade FROM Endereco e WHERE e.estado = :estado")
    List<String> findAllCidadesDistinctByEstado(String estado);

    List<Endereco> findAllByEstadoAndCidade(String estado, String cidade);
}
