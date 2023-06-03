package com.projetopuc.lazerparatodos.models.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario_table")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String email;
    String senha;

    public int getId() {
        return id;
    }

    public void setId(int id) {this.id = id; }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
