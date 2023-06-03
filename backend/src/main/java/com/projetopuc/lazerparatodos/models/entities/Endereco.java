package com.projetopuc.lazerparatodos.models.entities;

import jakarta.persistence.*;


@Entity
@Table(name = "endereco_table")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(name="bairro", nullable = false)
    String bairro;
    @Column(name="cidade", nullable = false)
    String cidade;
    @Column(name="estado", nullable = false)
    String estado;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

}
