package com.projetopuc.lazerparatodos.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "comentario_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="comentario", nullable = false)
    private String comentario;

    @Column(name="avaliacao", nullable = false)
    private Double avaliacao;

    @ManyToMany
    @JoinTable(name = "comentario_deficiencias_table")
    private List<Deficiencia> deficiencias;

    @ManyToOne
    @JoinColumn(name = "pcd_id")
    private PcD pcd;

    @ManyToOne
    @JoinColumn(name = "proprietario_id")
    private Proprietario proprietario;
}
