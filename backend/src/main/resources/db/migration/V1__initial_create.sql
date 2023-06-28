CREATE TABLE deficiencia_table
(
    id                  serial,
    tipo_de_deficiencia varchar(255) NOT NULL,
    url_icone           varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE endereco_table
(
    id     serial,
    bairro varchar(255) NOT NULL,
    cidade varchar(255) NOT NULL,
    estado varchar(2)   NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT UQ_ENDERECO UNIQUE (estado, cidade, bairro)
);

CREATE TABLE usuario_table
(
    id    serial,
    email varchar(255) DEFAULT NULL,
    papel varchar(255) DEFAULT NULL,
    senha varchar(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE pcd_table
(
    id          serial,
    nome        varchar(255) NOT NULL,
    endereco_id int          NOT NULL,
    usuarios_id int          NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_ENDERECO FOREIGN KEY (endereco_id) REFERENCES endereco_table (id),
    CONSTRAINT FK_USUARIO FOREIGN KEY (usuarios_id) REFERENCES usuario_table (id)
);

CREATE TABLE proprietario_table
(
    id                   serial,
    descricao            varchar(1024) NOT NULL,
    logradouro           varchar(255)  NOT NULL,
    nome_estabelecimento varchar(255)  NOT NULL,
    telefone             varchar(255)  NOT NULL,
    url_icone            varchar(255) DEFAULT NULL,
    endereco_id          int           NOT NULL,
    usuarios_id          int           NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_ENDERECO FOREIGN KEY (endereco_id) REFERENCES endereco_table (id),
    CONSTRAINT FK_USUARIO FOREIGN KEY (usuarios_id) REFERENCES usuario_table (id)
);

CREATE TABLE comentario_table
(
    id              serial,
    avaliacao       decimal(4, 2) NOT NULL,
    comentario      varchar(255)  NOT NULL,
    pcd_id          int DEFAULT NULL,
    proprietario_id int DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_PCD FOREIGN KEY (pcd_id) REFERENCES pcd_table (id),
    CONSTRAINT FK_PROPRIETARIO FOREIGN KEY (proprietario_id) REFERENCES proprietario_table (id)
);

CREATE TABLE imagem_table
(
    id              serial,
    url             varchar(255) NOT NULL,
    proprietario_id int DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_PROPRIETARIO FOREIGN KEY (proprietario_id) REFERENCES proprietario_table (id)
);

CREATE TABLE pcd_deficiencias_table
(
    pcd_id          int NOT NULL,
    deficiencias_id int NOT NULL,
    PRIMARY KEY (pcd_id, deficiencias_id),
    CONSTRAINT FK_PCD FOREIGN KEY (pcd_id) REFERENCES pcd_table (id),
    CONSTRAINT FK_DEFICIENCIA FOREIGN KEY (deficiencias_id) REFERENCES deficiencia_table (id)
);

CREATE TABLE pcd_favoritos_table
(
    fav_pcd_id          int NOT NULL,
    fav_proprietario_id int NOT NULL,
    PRIMARY KEY (fav_pcd_id, fav_proprietario_id),
    CONSTRAINT FK_PROPRIETARIO FOREIGN KEY (fav_proprietario_id) REFERENCES proprietario_table (id),
    CONSTRAINT FK_PCD FOREIGN KEY (fav_pcd_id) REFERENCES pcd_table (id)
);

CREATE TABLE proprietario_deficiencias_table
(
    proprietario_id int NOT NULL,
    deficiencias_id int NOT NULL,
    PRIMARY KEY (proprietario_id, deficiencias_id),
    CONSTRAINT FK_DEFICIENCIA FOREIGN KEY (deficiencias_id) REFERENCES deficiencia_table (id),
    CONSTRAINT FK_PROPRIETARIO FOREIGN KEY (proprietario_id) REFERENCES proprietario_table (id)
);

CREATE TABLE comentario_deficiencias_table
(
    comentario_id   int NOT NULL,
    deficiencias_id int NOT NULL,
    PRIMARY KEY (comentario_id, deficiencias_id),
    CONSTRAINT FK_COMENTARIO FOREIGN KEY (comentario_id) REFERENCES comentario_table (id),
    CONSTRAINT FK_DEFICIENCIA FOREIGN KEY (deficiencias_id) REFERENCES deficiencia_table (id)
);