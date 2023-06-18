package com.projetopuc.lazerparatodos.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "imagem_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Imagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="url", nullable = false)
    private String url;
}
