INSERT INTO tb_pequeno_Grupo (nome, apelido, lider) VALUES ('Waldirene', 'AZUL', 'Junior');
INSERT INTO tb_pequeno_Grupo (nome, apelido, lider) VALUES ('Pr. Alex', 'VERDE', 'Rhuan');
INSERT INTO tb_pequeno_Grupo (nome, apelido, lider) VALUES ('Amilton', 'AMARELO', 'Beto');
INSERT INTO tb_pequeno_Grupo (nome, apelido, lider) VALUES ('Yasmin', 'ROXO', 'Douglas');

INSERT INTO tb_projetos (nome, lider , coordenador, foto_coordenador, foto_lider, foto_fundo) VALUES ('Artesanato','Ana Clara', 'Gilson Ornelas', 'https://i.postimg.cc/8zsRnZ4h/gilson.png',  'https://i.postimg.cc/gkkD7ppc/Whats-App-Image-2024-03-21-at-10-34-03.jpg', 'https://i.postimg.cc/T2t5BKdm/artsanato.png');
INSERT INTO tb_projetos (nome, lider,  coordenador, foto_coordenador, foto_lider, foto_fundo) VALUES ('Jiu-Jtsu','Douglas Orellha', null, null, 'https://i.postimg.cc/wjKN09td/Orelha.png','https://i.postimg.cc/qv4fnvKb/jiu-jtsu.png');
INSERT INTO tb_projetos (nome, lider,  coordenador, foto_coordenador, foto_lider, foto_fundo) VALUES ('Teclado','Samuel Lopes', null, null, 'https://i.postimg.cc/7L8NGg10/Samuel.png', 'https://i.postimg.cc/T1KdzY0q/teclado.png');
INSERT INTO tb_projetos (nome, lider,  coordenador, foto_coordenador, foto_lider, foto_fundo) VALUES ('Canto','Catiane Saze', null, null, 'https://i.postimg.cc/9Q8svRVK/prof-canto.jpg', 'https://i.postimg.cc/TwL2S3Cj/canto.png');
INSERT INTO tb_projetos (nome, lider,  coordenador, foto_coordenador, foto_lider, foto_fundo) VALUES (	'Bateria',' Alan Sant''Ana', null, null, 'https://i.postimg.cc/YCD88SP8/prof-bateria.jpg', 'https://i.postimg.cc/VNScsHnm/Design-sem-nome-9.png');
INSERT INTO tb_projetos (nome, lider,  coordenador, foto_coordenador, foto_lider, foto_fundo) VALUES ('Violão','Samuel Lopes', null, null, 'https://i.postimg.cc/7L8NGg10/Samuel.png', 'https://i.postimg.cc/Y08F3xRD/violao.png');
INSERT INTO tb_projetos (nome, lider,  coordenador, foto_coordenador, foto_lider, foto_fundo) VALUES (	'Percursão',' Alan Sant''Ana', null, null, 'https://i.postimg.cc/YCD88SP8/prof-bateria.jpg', 'https://i.postimg.cc/nL86ZKKP/percursao.png');



INSERT INTO tb_role (authority ) VALUES ( 'ROLE_ADMIN');
INSERT INTO tb_role (authority ) VALUES ( 'ROLE_OPERADOR');


INSERT INTO tb_user (nome, sobrenome, email, password) VALUES ('Eleilson','Mendes' ,'eleison_mendes@hotmail.com', '$2a$10$7fUHpqBMkb8xzdigZvJo2eOmAitjGOcKV5YYaMjm6C/8AageW5pPe');
INSERT INTO tb_user (nome, sobrenome, email, password) VALUES ('Junior','Ribeiro Junior' ,'joseluizjunior@yahoo.com', '$2a$10$7fUHpqBMkb8xzdigZvJo2eOmAitjGOcKV5YYaMjm6C/8AageW5pPe');
INSERT INTO tb_user (nome, sobrenome, email, password) VALUES ('Jaline','Mirian Peereira' ,'jalineemirian@gmail.com', '$2a$10$7fUHpqBMkb8xzdigZvJo2eOmAitjGOcKV5YYaMjm6C/8AageW5pPe');
INSERT INTO tb_user (nome, sobrenome, email, password) VALUES ('Marcus','Mendes' ,'marcusmendes85@yahoo.com.br', '$2a$10$7fUHpqBMkb8xzdigZvJo2eOmAitjGOcKV5YYaMjm6C/8AageW5pPe');
INSERT INTO tb_user (nome, sobrenome, email, password) VALUES ('Rhuan','Tavares' ,'rhuan.tavares92@gmail.com', '$2a$10$7fUHpqBMkb8xzdigZvJo2eOmAitjGOcKV5YYaMjm6C/8AageW5pPe');


INSERT INTO tb_user_role (user_id, role_id ) VALUES ( 1, 1);
INSERT INTO tb_user_role (user_id, role_id ) VALUES ( 2, 1);
INSERT INTO tb_user_role (user_id, role_id ) VALUES ( 3, 1);
INSERT INTO tb_user_role (user_id, role_id ) VALUES ( 4, 1);

INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil, rua, bairro, numero, cidade, complemento, cep) VALUES (2, 'José Luiz', 'Ribeiro Junior', 'junior@gmail.com', '1988-10-07', 35, 970312251, '123.789.964-67', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (4, 'Marcus', 'Fereira Duarte', 'marcus@gmail.com', '1987-05-11', 37, '970312251', '923.289.964-12' ,0, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (2, 'Jaline', 'Pereira Fonseca', 'jaline@gmail.com', '1991-06-22', 30, '970312251', '954.789.964-99', 3, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (1, 'Aline', 'Pereira Fonseca', 'aline@gmail.com', '1988-10-07', 40, '970312251', '883.789.964-46', 2, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (1, 'Alex', 'Soares Fonseca', 'alex@gmail.com', '1967-01-14',65, '970312251', '149.789.964-67',2, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202','24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (3, 'Carlos','Henriques Silva', 'carlosx@gmail.com', '1970-09-14', 53, '970312251', '123.091.964-16', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (1, 'Gabriela', 'Lopez Marques', 'gabix@gmail.com', '1987-06-25', 41, '970312251', '128.308.317-56', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (2, 'João Arthur', 'Loureiro Ribeiro', 'joãox@gmail.com', '1981-04-19', 32, '970312251', '935.308.745-56', 2, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (2, 'Ana Cristina', 'Loureiro da Silva ', 'anax@gmail.com', '1984-01-14', null , '970312251', '876.308.317-32', 3, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (1, 'Laura Ester', 'Soares Fonseca', 'laura@gmail.com', '1970-01-14',67,'970312251', '128.128.317-33', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (2, 'Ricardo', 'Chavier Galvão', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '678.308.207-89', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (4, 'Luz', 'Mariao Araujo', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '907.308.317-77', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (1, 'Alberto', 'Soares silva', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '134.3438.317-96', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (1, 'Geraldo', 'Magela da Silva', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '166.308.999-56', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (2, 'Ricardo', 'Couto Pereira', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '192.308.317-31', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (3, 'Carmem', 'Alfredo Sampaio', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '728.308.317-56', 2, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (3, 'Karol', 'Machado Galvão', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '712.308.317-76', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (4, 'Joel', 'Pinheiro', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '828.908.317-56', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221');
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep) VALUES (4, 'Ricardo', 'Chavier Galvão', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '128.308.317-56', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221');



INSERT INTO tb_Aluno_Status (id, pendencia) VALUES (1, 'Identidade')
INSERT INTO tb_Aluno_Status (id, pendencia) VALUES (2, 'Assinatura')
INSERT INTO tb_Aluno_Status (id, pendencia) VALUES (3, 'Horários')


INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca) VALUES (2 , 'Thiago Pereira Fonseca','2010-05-11', 13, 234567899,'Joao Carlos', 1234567-78, '21970312251',  'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, 'https://i.postimg.cc/85qrHB69/Design-sem-nome.png', 'ricardo@gmail.com', 1, 1 );
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca)  VALUES (1 , 'Joana Lopez Marques','1977-05-11', 13, 234567899, null, null, '21970312251', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, 'https://i.postimg.cc/85qrHB69/Design-sem-nome.png', 'claudio@gmail.com', 1 , 1);
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca) VALUES (3 , 'Lucas Soares Fonseca','2005-05-15', 14, 23435432,'Lucia Helenar', 1234567-78, '978956732', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, 'https://i.postimg.cc/85qrHB69/Design-sem-nome.png', 'tereza@gmail.com', 2, 1 );
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca) VALUES (3 , 'Weverton  Henriques Silva ','2009-05-11', 14, 23435432,'Maria Ester', 1234567-78, '978956732', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221,null, 'ricardo@gmail.com', 3 , 1);
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca) VALUES (1 , 'Alda Chavier Galvão','1979-05-11', 56, 23435432,'', null, '978956732','rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, null, 'ricardo@gmail.com', 1, 1);
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca) VALUES (1 , 'Ilza  nobre da Silva  ','1955-05-11', 57, 23435432, null, null, '978956732', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, null, 'ricardo@gmail.com', 3, 1 );
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca) VALUES (1 , 'Jamile Hebert Judá  ','1955-05-11', 57, 23435432, null, null, '978956732', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, null, 'ricardo@gmail.com', null, 1 );
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca) VALUES (1 , 'Marieta Loureiro da Silva  ','1955-05-11', 57, 23435432, null, null, '978956732' , 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, null, 'joseo@gmail.com', null, 1);
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca) VALUES (1 , 'Carla Moreno da Silva  ','1955-05-11', 57, 23435432, null, null, '978956732' , 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, null, 'ricardo@gmail.com', 1, 1);
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca) VALUES (1 , 'Lucia kaiser da Costa  ','1955-05-11', 57, 23435432, null, null, '978956732',' rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, null, 'lucas@gmail.com', 3, 1 );



INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-04-05', 0, 1, 2)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id ) VALUES ('2024-04-05', 1, 2, 1)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-04-05', 2, 3, 3)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-04-05', 2, 4, 3)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-04-05', 2, 5, 1)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-04-10', 0, 1, 2)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-04-10', 0, 2, 1)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-04-10', 0, 3, 3)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-04-10', 2, 4, 3)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-04-17', 1, 1, 2)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-04-23', 2, 1, 2)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-04-27', 0, 1, 2)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-05-01', 0, 1, 2)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-05-04', 1, 1, 2)




INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-05', 1, 'teste1','teste2','teste3','teste4','teste5')
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-05', 2, 'Sim, a aula ocorreu sem problemas.', 'Não, nenhum aluno apresentou problemas.', 'Não, o material das aulas foi suficiente e compreensível.', 'Seria útil fornecer mais exemplos práticos durante as aulas.', 'Não, nada mais a observar no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-05', 3, 'Sim, a aula ocorreu normalmente.', 'Sim, um aluno apresentou dificuldades de aprendizagem.', 'Sim, alguns alunos tiveram dificuldade com o material das aulas.', 'A equipe de trabalho poderia disponibilizar mais recursos online para estudo.', 'Nenhuma observação adicional no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-10', 1, 'Não, houve atraso na chegada do professor.', 'Não, todos os alunos participaram ativamente.', 'Não, o material das aulas foi bem preparado.', 'Seria útil organizar uma revisão geral antes de exames.', 'Nenhuma observação adicional no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-10', 2, 'Sim, mas houve um problema técnico no meio da aula.', 'Não, os alunos estavam engajados.', 'Sim, alguns alunos pediram material adicional.', 'A equipe de trabalho poderia criar grupos de estudo online.', 'Nenhuma observação adicional no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-10', 3, 'Não, a aula foi cancelada devido a problemas técnicos.', 'Não, nenhum problema foi relatado.', 'Sim, alguns alunos acharam o material muito avançado.', 'Seria útil disponibilizar tutoriais online.', 'Nenhuma observação adicional no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-23', 1, 'Sim, mas houve uma interrupção breve.', 'Sim, um aluno precisou de ajuda extra.', 'Não, o material foi bem compreendido pela maioria.', 'Seria útil criar um fórum online para discussões.', 'Nenhuma observação adicional no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-23', 2, 'Não, houve atraso na chegada do professor.', 'Sim, um aluno precisou de ajuda extra.', 'Não, o material foi bem compreendido pela maioria.', 'Seria útil criar um fórum online para discussões.', 'Nenhuma observação adicional no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-23', 3, 'Sim, mas houve uma interrupção breve.', 'Sim, um aluno precisou de ajuda extra.', 'Não, o material foi bem compreendido pela maioria.', 'Seria útil criar um fórum online para discussões.', 'Nenhuma observação adicional no momento.');





INSERT INTO tb_visitante (nome, sobrenome, PG_id, sexo) VALUES ('Elias','Levia Silva', 3, 'Masculino');
INSERT INTO tb_visitante (nome, sobrenome, PG_id, sexo) VALUES ('Andre','Favale Nogueira', 1,'Masculino');
INSERT INTO tb_visitante (nome, sobrenome, PG_id, sexo) VALUES ('Maria','Laurindo Souza', 2, 'Feminino');
INSERT INTO tb_visitante (nome, sobrenome, PG_id, sexo) VALUES ('Emerson','Levia Silva', 2, 'Masculino');
INSERT INTO tb_visitante (nome, sobrenome, PG_id, sexo) VALUES ('José','Bueno Vera', 2, 'Masculino');
