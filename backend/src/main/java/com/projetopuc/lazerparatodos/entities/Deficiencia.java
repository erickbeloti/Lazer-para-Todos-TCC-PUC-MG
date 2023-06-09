package com.projetopuc.lazerparatodos.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "deficiencia_table")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Deficiencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="tipoDeDeficiencia", nullable = false)
    private String tipoDeDeficiencia;

    @Column(name="urlIcone", nullable = false)
    private String urlIcone;
}
