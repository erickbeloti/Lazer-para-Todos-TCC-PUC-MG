package com.projetopuc.lazerparatodos.entities;

public class Comentario {

    String comentario;
    Double avaliacao;
    Deficiencia[] deficiencias;
    Pcd pcd;
    Proprietario proprietario;

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

    public Deficiencia[] getDeficiencias() {
        return deficiencias;
    }

    public void setDeficiencias(Deficiencia[] deficiencias) {
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
