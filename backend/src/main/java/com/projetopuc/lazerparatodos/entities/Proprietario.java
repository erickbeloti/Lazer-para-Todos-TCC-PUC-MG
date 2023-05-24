package com.projetopuc.lazerparatodos.entities;

public class Proprietario extends Endereco {
    String nomeEstabelecimento;
    String logadouro;
    String telefone;
    String descricao;
    String urlIcone;
    Imagem[] imagens;
    Pcd[] favoritos;
    Deficiencia[] deficiencias;
    Comentario[] comentarios;

    public String getNomeEstabelecimento() {
        return nomeEstabelecimento;
    }

    public void setNomeEstabelecimento(String nomeEstabelecimento) {
        this.nomeEstabelecimento = nomeEstabelecimento;
    }

    public String getLogadouro() {
        return logadouro;
    }

    public void setLogadouro(String logadouro) {
        this.logadouro = logadouro;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getUrlIcone() {
        return urlIcone;
    }

    public void setUrlIcone(String urlIcone) {
        this.urlIcone = urlIcone;
    }

    public Imagem[] getImagens() {
        return imagens;
    }

    public void setImagens(Imagem[] imagens) {
        this.imagens = imagens;
    }

    public Pcd[] getFavoritos() {
        return favoritos;
    }

    public void setFavoritos(Pcd[] favoritos) {
        this.favoritos = favoritos;
    }

    public Deficiencia[] getDeficiencias() {
        return deficiencias;
    }

    public void setDeficiencias(Deficiencia[] deficiencias) {
        this.deficiencias = deficiencias;
    }

    public Comentario[] getComentarios() {
        return comentarios;
    }

    public void setComentarios(Comentario[] comentarios) {
        this.comentarios = comentarios;
    }
}
