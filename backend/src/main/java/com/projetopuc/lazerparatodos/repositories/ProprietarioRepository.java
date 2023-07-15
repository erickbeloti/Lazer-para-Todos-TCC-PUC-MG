package com.projetopuc.lazerparatodos.repositories;

import com.projetopuc.lazerparatodos.dtos.response.ProprietarioSummaryResponseDto;
import com.projetopuc.lazerparatodos.entities.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
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

    /*@Query("SELECT p FROM Proprietario p JOIN FETCH p.endereco e WHERE " +
            "(p.nomeEstabelecimento = :nome OR :nome is null OR :nome = '') AND" +
            "(e.estado = :estado OR :estado is null OR :estado = '')  AND" +
            "(e.bairro = :bairro OR :bairro is null OR :bairro = '') AND " +
            "(e.cidade = :cidade OR :cidade is null OR :cidade ='')")
    List<Proprietario> findProprieratioByfilter(@Param("nome") String nomeEstabelecimento,
                                         @Param("estado") String estado, @Param("bairro") String bairro,
                                                       @Param("cidade") String cidade);*/


    @Query(value ="SELECT DISTINCT sub.id, sub.nome_estabelecimento, sub.descricao, sub.endereco_id," +
            "sub.logradouro, sub.telefone, sub.url_icone, sub.usuarios_id FROM " +
            "(SELECT pt.id, pt.nome_estabelecimento, pt.descricao, pt.endereco_id, pt.logradouro, pt.telefone, pt.url_icone, pt.usuarios_id," +
            "e.estado, e.cidade, e.bairro, pdt.deficiencias_id, " +
            "(SELECT avg(c.avaliacao) FROM comentario_table c WHERE c.proprietario_id = pt.id) as avaliacao_media FROM proprietario_table pt " +
            "JOIN endereco_table e ON e.id = pt.endereco_id " +
            "JOIN  proprietario_deficiencias_table pdt ON pdt.proprietario_id = pt.id " +
            "WHERE :deficienciasIds is null OR pdt.deficiencias_id IN (:deficienciasIds)) sub WHERE " +
            "(sub.nome_Estabelecimento = :nome OR :nome is null OR :nome ='') AND " +
            "(sub.estado = :estado OR :estado is null OR :estado = '') AND " +
            "(sub.bairro = :bairro OR :bairro is null OR :bairro = '') AND " +
            "(sub.cidade = :cidade OR :cidade is null OR :cidade = '') AND " +
            "(sub.avaliacao_media >= :avMedia OR :avMedia is null)" , nativeQuery = true)
    List<Proprietario> findProprieratioByfilter(@Param("nome")  String nomeEstabelecimento,
                                                                  @Param("estado") String estado,
                                                                  @Param("cidade") String cidade,
                                                                  @Param("bairro") String bairro,
                                                                  @Param("avMedia") BigDecimal avMedia,
                                                                  @Param("deficienciasIds") List<Integer> deficienciasIds);



    List<Proprietario> findAllByEnderecoCidade(String cidade);
}

