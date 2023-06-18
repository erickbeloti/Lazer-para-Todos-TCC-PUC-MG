package com.projetopuc.lazerparatodos.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
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
    private Integer id;

    @Column(name="comentario", nullable = false)
    private String comentario;

    @Column(name="avaliacao", nullable = false, precision = 4, scale = 2)
    private BigDecimal avaliacao;

    @ManyToMany
    @JoinTable(name = "comentario_deficiencias_table")
    private List<Deficiencia> deficiencias;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pcd_id")
    private PcD pcd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proprietario_id")
    private Proprietario proprietario;
}
