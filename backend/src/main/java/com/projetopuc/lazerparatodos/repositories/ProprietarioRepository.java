package com.projetopuc.lazerparatodos.repositories;

import com.projetopuc.lazerparatodos.entities.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProprietarioRepository extends JpaRepository<Proprietario, Integer> {

    List<Proprietario> findBynomeEstabelecimento(String nomeEstabelecimento);

    @Query("SELECT p FROM Proprietario p JOIN FETCH p.endereco e WHERE " +
            "(p.nomeEstabelecimento = :nome OR :nome is null OR :nome = '') AND" +
            "(e.estado = :estado OR :estado is null OR :estado = '')  AND" +
            "(e.bairro = :bairro OR :bairro is null OR :bairro = '') AND " +
            "(e.cidade = :cidade OR :cidade is null OR :cidade ='')")
    List<Proprietario> findProprieratioByfilter(@Param("nome") String nomeEstabelecimento,
                                         @Param("estado") String estado, @Param("bairro") String bairro,
                                                       @Param("cidade") String cidade);
}
