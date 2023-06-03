package com.projetopuc.lazerparatodos.models.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "imagem_table")
public class Imagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name="url", nullable = false)
    String url;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
