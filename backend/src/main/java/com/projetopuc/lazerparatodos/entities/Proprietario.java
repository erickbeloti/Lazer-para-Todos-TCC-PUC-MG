package com.projetopuc.lazerparatodos.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "proprietario_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Proprietario{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="nomeEstabelecimento", nullable = false)
    private String nomeEstabelecimento;

    @Column(name="logradouro", nullable = false)
    private String logradouro;

    @Column(name="telefone", nullable = false)
    private String telefone;

    @Column(name="descricao", nullable = false)
    private String descricao;

    @Column(name="urlIcone")
    private String urlIcone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "endereco_id", nullable = false)
    private Endereco endereco;

    @OneToMany
    @JoinColumn(name = "proprietario_id")
    private List<Imagem> imagens;

    @ManyToMany
    @JoinTable(name = "proprietario_deficiencias_table")
    private List<Deficiencia> deficiencias;

    @OneToMany(mappedBy = "proprietario")
    private List<Comentario> comentarios;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "usuarios_id", nullable = false)
    private Usuario usuario;
}
