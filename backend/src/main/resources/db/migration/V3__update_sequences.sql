SELECT SETVAL('lazerparatodos_schema.comentario_table_id_seq', COALESCE(MAX(id), 1) ) FROM lazerparatodos_schema.comentario_table;
SELECT SETVAL('lazerparatodos_schema.deficiencia_table_id_seq', COALESCE(MAX(id), 1) ) FROM lazerparatodos_schema.deficiencia_table;
SELECT SETVAL('lazerparatodos_schema.endereco_table_id_seq', COALESCE(MAX(id), 1) ) FROM lazerparatodos_schema.endereco_table;
SELECT SETVAL('lazerparatodos_schema.imagem_table_id_seq', COALESCE(MAX(id), 1) ) FROM lazerparatodos_schema.imagem_table;
SELECT SETVAL('lazerparatodos_schema.pcd_table_id_seq', COALESCE(MAX(id), 1) ) FROM lazerparatodos_schema.pcd_table;
SELECT SETVAL('lazerparatodos_schema.proprietario_table_id_seq', COALESCE(MAX(id), 1) ) FROM lazerparatodos_schema.proprietario_table;
SELECT SETVAL('lazerparatodos_schema.usuario_table_id_seq', COALESCE(MAX(id), 1) ) FROM lazerparatodos_schema.usuario_table;