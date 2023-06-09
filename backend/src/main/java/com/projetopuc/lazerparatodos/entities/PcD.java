package com.projetopuc.lazerparatodos.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "pcd_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PcD {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @ManyToMany
    @JoinTable(name = "pcd_favoritos_table",
            joinColumns = {@JoinColumn(name = "fav_pcd_id")},
            inverseJoinColumns = {@JoinColumn(name = "fav_proprietario_id")}
    )
    private List<Proprietario> favoritos;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "pcd_deficiencias_table")
    private List<Deficiencia> deficiencias;

    @ManyToOne
    @JoinColumn(name = "endereco_id", nullable = false)
    private Endereco endereco;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "usuarios_id", nullable = false)
    private Usuario usuario;
}
