package com.projetopuc.lazerparatodos.models.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "deficiencia_table")
public class Deficiencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name="tipoDeDeficiencia", nullable = false)
    String tipoDeDeficiencia;
    @Column(name="urlIcone", nullable = false)
    String urlIcone;


    public Deficiencia() {
    }

    public Deficiencia(int id, String tipoDeDeficiencia, String urlIcone) {
        this.id = id;
        this.tipoDeDeficiencia = tipoDeDeficiencia;
        this.urlIcone = urlIcone;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTipoDeDeficiencia() {
        return tipoDeDeficiencia;
    }

    public void setTipoDeDeficiencia(String tipoDeDeficiencia) {
        this.tipoDeDeficiencia = tipoDeDeficiencia;
    }

    public String getUrlIcone() {
        return urlIcone;
    }

    public void setUrlIcone(String urlIcone) {
        this.urlIcone = urlIcone;
    }
}
