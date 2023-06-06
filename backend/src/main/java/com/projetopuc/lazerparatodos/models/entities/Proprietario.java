package com.projetopuc.lazerparatodos.models.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "proprietario_table")
public class Proprietario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column(name="nomeEstabelecimento", nullable = false)
    String nomeEstabelecimento;
    @Column(name="logadouro", nullable = false)
    String logadouro;
    @Column(name="telefone", nullable = false)
    String telefone;
    @Column(name="descricao", nullable = false)
    String descricao;
    @Column(name="urlIcone", nullable = false)
    String urlIcone;
    @OneToOne
    @JoinColumn(name = "endereco_id")
    Endereco endereco;
    @OneToMany
    @JoinColumn(name = "imagens_id")
    List<Imagem> imagens;
    @OneToMany
    @JoinColumn(name = "favoritos_id")
    List<Pcd> favoritos;
    @OneToMany
    @JoinColumn(name = "deficiencias_id")
    List<Deficiencia> deficiencias;
    @OneToMany
    @JoinColumn(name = "comentarios_id")
    List<Comentario> comentarios;

    @OneToOne
    @JoinColumn(name = "usuarios_id")
    Usuario usuario;

    @OneToMany
    @JoinColumn(name = "deficiencias_prop_id")
    List<Deficiencia> deficiencias;

    public Proprietario() {
    }
    public Proprietario(String nomeEstabelecimento, String logadouro, String telefone, String descricao, String urlIcone
                        ) {
        this.nomeEstabelecimento = nomeEstabelecimento;
        this.logadouro = logadouro;
        this.telefone = telefone;
        this.descricao = descricao;
        this.urlIcone = urlIcone;
        this.imagens = imagens;
        this.favoritos = favoritos;
        this.deficiencias = deficiencias;
        this.comentarios = comentarios;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

   public List<Imagem> getImagens() {
        return imagens;
    }

    public void setImagens(List<Imagem> imagens) { this.imagens = imagens;
    }

    public List<Pcd> getFavoritos() {
        return favoritos;
    }

    public void setFavoritos(List<Pcd> favoritos) {
        this.favoritos = favoritos;
    }

    public List<Deficiencia> getDeficiencias() { return deficiencias; }

    public void setDeficiencias(List<Deficiencia> deficiencias) { this.deficiencias = deficiencias; }

    public List<Comentario> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<Deficiencia> getDeficiencias() {
        return deficiencias;
    }

    public void setDeficiencias(List<Deficiencia> deficiencias) {
        this.deficiencias = deficiencias;
    }
}
