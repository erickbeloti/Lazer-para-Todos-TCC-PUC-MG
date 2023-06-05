package com.projetopuc.lazerparatodos.models.repositories;

import com.projetopuc.lazerparatodos.models.entities.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface ProprietarioRepository extends JpaRepository<Proprietario, Integer> {

    public List<Proprietario> findBynomeEstabelecimento(String nomeEstabelecimento);

    @Query("SELECT p FROM Proprietario p WHERE p.nomeEstabelecimento = :nome and p.logadouro = :local")
    public List<Proprietario> findProprieratioByfilter(@Param("nome") String nomeEstabelecimento,
                                         @Param("local") String logadouro);

}
