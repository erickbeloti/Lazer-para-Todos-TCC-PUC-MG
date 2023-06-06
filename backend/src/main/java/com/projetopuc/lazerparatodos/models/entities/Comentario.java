package com.projetopuc.lazerparatodos.models.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "comentario_table")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name="comentario", nullable = false)
    String comentario;
    @Column(name="avaliacao", nullable = false)
    Double avaliacao;
    @OneToMany
    @JoinColumn(name = "deficiencias_comentario_id")
    List<Deficiencia> deficiencias;
    @ManyToOne
    @JoinColumn(name = "pcd_id")
    Pcd pcd;
    @ManyToOne
    @JoinColumn(name = "proprietario_id")
    Proprietario proprietario;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Double getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(Double avaliacao) {
        this.avaliacao = avaliacao;
    }

    public List<Deficiencia> getDeficiencias() {
        return deficiencias;
    }

    public void setDeficiencias(List<Deficiencia> deficiencias) {
        this.deficiencias = deficiencias;
    }

    public Pcd getPcd() {
        return pcd;
    }

    public void setPcd(Pcd pcd) {
        this.pcd = pcd;
    }

    public Proprietario getProprietario() {
        return proprietario;
    }

    public void setProprietario(Proprietario proprietario) {
        this.proprietario = proprietario;
    }
}
