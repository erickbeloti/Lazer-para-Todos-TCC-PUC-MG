package com.projetopuc.lazerparatodos.entities;

public class Pcd extends Usuario {
    String nome;
    Proprietario[] favoritos;
    Deficiencia[] deficiencias;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Proprietario[] getFavoritos() {
        return favoritos;
    }

    public void setFavoritos(Proprietario[] favoritos) {
        this.favoritos = favoritos;
    }

    public Deficiencia[] getDeficiencias() {
        return deficiencias;
    }

    public void setDeficiencias(Deficiencia[] deficiencias) {
        this.deficiencias = deficiencias;
    }


}
