INSERT INTO tb_pequeno_Grupo (nome, apelido, lider) VALUES ('Waldirene', 'AZUL', 'Junior');
INSERT INTO tb_pequeno_Grupo (nome, apelido, lider) VALUES ('Pr. Alex', 'VERDE', 'Rhuan');
INSERT INTO tb_pequeno_Grupo (nome, apelido, lider) VALUES ('Amilton', 'AMARELO', 'Beto');
INSERT INTO tb_pequeno_Grupo (nome, apelido, lider) VALUES ('Yasmin', 'ROXO', 'Douglas');

INSERT INTO tb_projetos (nome, lider , coordenador, foto_coordenador, foto_lider) VALUES ('Artesanato','Ana Clara', 'Gilson Ornelas', 'https://i.postimg.cc/8zsRnZ4h/gilson.png',  'https://i.postimg.cc/R0VrgjNt/whatsapp-image-2022-10-03-at-15-34-37.webp');
INSERT INTO tb_projetos (nome, lider,  coordenador, foto_coordenador, foto_lider) VALUES ('Jiu-Jtsu','Douglas Orellha', null, null, 'https://i.postimg.cc/wjKN09td/Orelha.png');
INSERT INTO tb_projetos (nome, lider,  coordenador, foto_coordenador, foto_lider) VALUES ('Musica','Samuel', null, null, 'https://i.postimg.cc/7L8NGg10/Samuel.png');

INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep) VALUES (2 , 'Thiago Pereira Fonseca','2010-05-11', 13, 234567899,'Joao Carlos', 1234567-78, '97434578',  'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221 );
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep)  VALUES (1 , 'Joana Lopez Marques','1977-05-11', 13, 234567899, null, null, '965786324', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221 );
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep) VALUES (3 , 'Lucas Soares Fonseca','2005-05-15', 14, 23435432,'Lucia Helenar', 1234567-78, '978956732', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221 );
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep) VALUES (3 , 'Weverton  Henriques Silva ','2009-05-11', 14, 23435432,'Maria Ester', 1234567-78, '978956732', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221 );
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep) VALUES (1 , 'Alda Chavier Galvão','1979-05-11', 56, 23435432,'', null, '978956732','rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221);
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep) VALUES (1 , 'Ilza  nobre da Silva  ','1955-05-11', 57, 23435432, null, null, '978956732', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221 );
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep) VALUES (1 , 'Jamile Hebert Judá  ','1955-05-11', 57, 23435432, null, null, '978956732', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221 );
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep) VALUES (1 , 'Marieta Loureiro da Silva  ','1955-05-11', 57, 23435432, null, null, '978956732' , 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221);
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep) VALUES (1 , 'Carla Moreno da Silva  ','1955-05-11', 57, 23435432, null, null, '978956732' , 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221);
INSERT INTO tb_alunos (projeto_id, nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep) VALUES (1 , 'Lucia kaiser da Costa  ','1955-05-11', 57, 23435432, null, null, '978956732',' rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221 );

INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id) VALUES ('2024-04-05', 0, 1)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id ) VALUES ('2024-04-05', 1, 2)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id) VALUES ('2024-04-05', 2, 3)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id) VALUES ('2024-04-05', 2, 4)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id) VALUES ('2024-04-05', 2, 5)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id) VALUES ('2024-04-10', 0, 1)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id) VALUES ('2024-04-10', 0, 2)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id) VALUES ('2024-04-10', 0, 3)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id) VALUES ('2024-04-10', 2, 4)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id) VALUES ('2024-04-17', 1, 1)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id) VALUES ('2024-04-23', 2, 1)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id) VALUES ('2024-04-27', 0, 1)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id) VALUES ('2024-05-01', 0, 1)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id) VALUES ('2024-05-04', 1, 1)


INSERT INTO tb_user (nome, email, password, role) VALUES ('Eleilson','leo@gmail.com', '1234', 0);
INSERT INTO tb_user (nome, email, password, role) VALUES ('Junior','junior@gmail.com', '1234', 1);
INSERT INTO tb_user (nome, email, password, role) VALUES ('Rhuan','rhuan@gmail.com', '1234', 1);


INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil, rua, bairro, numero, cidade, complemento, cep) VALUES (2, 'José Luiz', 'Ribeiro Junior', 'junior@gmail.com', '1988-10-07', 35, 970312251, 'https://i.postimg.cc/MKdx2H0M/fotojpg.jpg', '123.789.964-67', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (4, 'Marcus', 'Fereira Duarte', 'marcus@gmail.com', '1987-05-11', 37, '970312251', 'https://i.postimg.cc/rsDYBTkd/Foto-Perfil.jpg','923.289.964-12' ,0);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url. cpf, estado_Civil) VALUES (2, 'Jaline', 'Pereira Fonseca', 'jaline@gmail.com', '1991-06-22', 30, '970312251', 'https://i.postimg.cc/R0VrgjNt/whatsapp-image-2022-10-03-at-15-34-37.webp', '954.789.964-99', 3);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (1, 'Aline', 'Pereira Fonseca', 'aline@gmail.com', '1988-10-07', 40, '970312251', 'https://i.postimg.cc/RV9g1w36/images.jpg' '883.789.964-46', 2);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (1, 'Alex', 'Soares Fonseca', 'alex@gmail.com', '1967-01-14',65, '970312251', 'https://i.postimg.cc/R0pSBsns/367691418-2949665051834842-2639936827911429817-n.jpg', '149.789.964-67',2);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (3, 'Carlos','Henriques Silva', 'carlosx@gmail.com', '1970-09-14', 53, '970312251', 'https://i.postimg.cc/7bvXjT9c/perfil-004.jpg', '123.091.964-16', 1);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (1, 'Gabriela', 'Lopez Marques', 'gabix@gmail.com', '1987-06-25', 41, '970312251', '', '128.308.317-56', 1);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (2, 'João Arthur', 'Loureiro Ribeiro', 'joãox@gmail.com', '1981-04-19', 32, '970312251', '', '935.308.745-56', 2);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (2, 'Ana Cristina', 'Loureiro da Silva ', 'anax@gmail.com', '1984-01-14', 28, '970312251', '', '876.308.317-32', 3);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (1, 'Laura Ester', 'Soares Fonseca', 'laura@gmail.com', '1970-01-14',67,'970312251', '', '128.128.317-33', 1);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (2, 'Ricardo', 'Chavier Galvão', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '', '678.308.207-89', 1);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (4, 'Luz', 'Mariao Araujo', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '', '907.308.317-77', 1);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (1, 'Alberto', 'Soares silva', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '', '134.3438.317-96', 1);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (1, 'Geraldo', 'Magela da Silva', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '', '166.308.999-56', 1);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (2, 'Ricardo', 'Couto Pereira', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '', '192.308.317-31', 1);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (3, 'Carmem', 'Alfredo Sampaio', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '', '728.308.317-56', 2);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (3, 'Karol', 'Machado Galvão', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '', '712.308.317-76', 1);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (4, 'Joel', 'Pinheiro', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '', '828.908.317-56', 1);
INSERT INTO tb_membro (PG_id, nome, sobrenome, email, data_Nascimento, idade, telefone, url, cpf, estado_Civil) VALUES (4, 'Ricardo', 'Chavier Galvão', 'ricardo@gmail.com', '1967-01-14', 70, '970312251', '', '128.308.317-56', 1);


INSERT INTO tb_visitante (nome, sobrenome, PG_id, sexo) VALUES ('Elias','Levia Silva', 3, 'Masculino');
INSERT INTO tb_visitante (nome, sobrenome, PG_id, sexo) VALUES ('Andre','Favale Nogueira', 1,'Masculino');
INSERT INTO tb_visitante (nome, sobrenome, PG_id, sexo) VALUES ('Maria','Laurindo Souza', 2, 'Feminino');
INSERT INTO tb_visitante (nome, sobrenome, PG_id, sexo) VALUES ('Emerson','Levia Silva', 2, 'Masculino');
INSERT INTO tb_visitante (nome, sobrenome, PG_id, sexo) VALUES ('José','Bueno Vera', 2, 'Masculino');






