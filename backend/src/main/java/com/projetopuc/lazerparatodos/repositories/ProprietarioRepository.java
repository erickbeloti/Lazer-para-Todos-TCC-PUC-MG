package com.projetopuc.lazerparatodos.repositories;

import com.projetopuc.lazerparatodos.entities.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProprietarioRepository extends JpaRepository<Proprietario, Integer> {
    @Query("SELECT p FROM Proprietario p" +
            " LEFT JOIN FETCH p.usuario" +
            " LEFT JOIN FETCH p.endereco" +
            " LEFT JOIN FETCH p.imagens" +
            " WHERE p.id = :id")
    Optional<Proprietario> findById(Integer id);

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
