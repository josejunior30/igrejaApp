
INSERT INTO tb_projetos (nome, lider , coordenador, foto_coordenador, foto_lider, foto_fundo) VALUES ('Artesanato','Ana Clara', 'Gilson Ornelas', 'https://i.postimg.cc/8zsRnZ4h/gilson.png',  'https://i.postimg.cc/gkkD7ppc/Whats-App-Image-2024-03-21-at-10-34-03.jpg', 'https://i.postimg.cc/T2t5BKdm/artsanato.png');
INSERT INTO tb_projetos (nome, lider,  coordenador, foto_coordenador, foto_lider, foto_fundo) VALUES ('Jiu-Jtsu','Douglas Orellha', null, null, 'https://i.postimg.cc/wjKN09td/Orelha.png','https://i.postimg.cc/qv4fnvKb/jiu-jtsu.png');
INSERT INTO tb_projetos (nome, lider,  coordenador, foto_coordenador, foto_lider, foto_fundo) VALUES ('Teclado','Samuel Lopes', null, null, 'https://i.postimg.cc/7L8NGg10/Samuel.png', 'https://i.postimg.cc/T1KdzY0q/teclado.png');
INSERT INTO tb_projetos (nome, lider,  coordenador, foto_coordenador, foto_lider, foto_fundo) VALUES ('Canto','Catiane Saze', null, null, 'https://i.postimg.cc/9Q8svRVK/prof-canto.jpg', 'https://i.postimg.cc/TwL2S3Cj/canto.png');
INSERT INTO tb_projetos (nome, lider,  coordenador, foto_coordenador, foto_lider, foto_fundo) VALUES (	'Bateria',' Alan Sant''Ana', null, null, 'https://i.postimg.cc/YCD88SP8/prof-bateria.jpg', 'https://i.postimg.cc/VNScsHnm/Design-sem-nome-9.png');
INSERT INTO tb_projetos (nome, lider,  coordenador, foto_coordenador, foto_lider, foto_fundo) VALUES ('Violão e guitarra','Samuel Lopes', null, null, 'https://i.postimg.cc/7L8NGg10/Samuel.png', 'https://i.postimg.cc/Y08F3xRD/violao.png');
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
INSERT INTO tb_user_role (user_id, role_id ) VALUES ( 3, 2);
INSERT INTO tb_user_role (user_id, role_id ) VALUES ( 4, 2);

INSERT INTO tb_curso(nome, url) VALUES ( 'Fundamentos', 'https://i.postimg.cc/13SywQfk/6.png');
INSERT INTO tb_curso(nome, url) VALUES ( 'Biblia e Teologia', 'https://i.postimg.cc/vmMwgLSb/5.png');
INSERT INTO tb_curso(nome, url) VALUES ( 'Vida Cristã', 'https://i.postimg.cc/J0TzKYvN/4.png');
INSERT INTO tb_curso(nome, url) VALUES ( 'Capacitação Ministerial', 'https://i.postimg.cc/mZF4nDMx/7.png');
INSERT INTO tb_curso(nome, url) VALUES ( 'Crianças', 'https://i.postimg.cc/5tvj13QJ/3.png');
INSERT INTO tb_curso(nome, url) VALUES ( 'Palavra & Vida','https://i.postimg.cc/hvMf6tz7/1.png');
INSERT INTO tb_curso(nome, url) VALUES ( 'Adolescentes', 'https://i.postimg.cc/XYrp13Vp/2.png');


INSERT INTO tb_EBD_curso(nome, curso_id) VALUES ( 'genesis', '1');
INSERT INTO tb_EBD_curso(nome, curso_id) VALUES ( 'Moises', '2');
INSERT INTO tb_EBD_curso(nome, curso_id) VALUES ( 'Exodo', '3');



INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil, rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('José Luiz', 'Ribeiro Junior', 'junior@gmail.com', '1988-10-07', 35, 21970312251, '123.789.964-67', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221', true, 1);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep , status, curso_id) VALUES ('Marcus', 'Fereira Duarte', 'marcus@gmail.com', '1987-05-11', 37, '21970312251', '923.289.964-12' ,0, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221', true, 1);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('Jaline', 'Pereira Fonseca', 'jaline@gmail.com', '1991-06-22', 30, '21970312251', '954.789.964-99', 3, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221', true, 1);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('Aline', 'Pereira Fonseca', 'aline@gmail.com', '1988-10-07', 40, '21970312251', '883.789.964-46', 2, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221', false, 1);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('Alex', 'Soares Fonseca', 'alex@gmail.com', '1967-01-14',65, '21970312251', '149.789.964-67',2, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202','24110221', true, 1);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('Carlos','Henriques Silva', 'carlosx@gmail.com', '1970-09-14', 53, '21970312251', '123.091.964-16', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221', false, 2);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ( 'Gabriela', 'Lopez Marques', 'gabix@gmail.com', '1987-06-25', 41, '21970312251', '128.308.317-56', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221', true, 3);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('João Arthur', 'Loureiro Ribeiro', 'joãox@gmail.com', '1981-04-19', 32, '21970312251', '935.308.745-56', 2, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221', true, 4);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('Ana Cristina', 'Loureiro da Silva ', 'anax@gmail.com', '1984-01-14', null , '21970312251', '876.308.317-32', 3, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221', true, 4);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES('Laura Ester', 'Soares Fonseca', 'laura@gmail.com', '1970-01-14',67,'21970312251', '128.128.317-33', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221', true, 5);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('Ricardo', 'Chavier Galvão', 'ricardo@gmail.com', '1967-01-14', 70, '21970312251', '678.308.207-89', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221', true, 1);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('Luz', 'Mariao Araujo', 'ricardo@gmail.com', '1967-01-14', 70, '21970312251', '907.308.317-77', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221', false, 1);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('Alberto', 'Soares silva', 'ricardo@gmail.com', '1967-01-14', 70, '21970312251', '134.3438.317-96', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221', false, 4);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status,curso_id) VALUES ('Geraldo', 'Magela da Silva', 'ricardo@gmail.com', '1967-01-14', 70, '21970312251', '166.308.999-56', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221', true, 4);
INSERT INTO tb_membro (nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('Ricardo', 'Couto Pereira', 'ricardo@gmail.com', '1967-01-14', 70, '21970312251', '192.308.317-31', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221', true, 2);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('Carmem', 'Alfredo Sampaio', 'ricardo@gmail.com', '1967-01-14', 70, '21970312251', '728.308.317-56', 2, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221', true, 3);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('Karol', 'Machado Galvão', 'ricardo@gmail.com', '1967-01-14', 70, '21970312251', '712.308.317-76', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202',' 24110221', true, 3);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ( 'Joel', 'Pinheiro', 'ricardo@gmail.com', '1967-01-14', 70, '21970312251', '828.908.317-56', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221', true, 2);
INSERT INTO tb_membro ( nome, sobrenome, email, data_Nascimento, idade, telefone, cpf, estado_Civil,  rua, bairro, numero, cidade, complemento, cep, status, curso_id) VALUES ('Ricardo', 'Chavier Galvão', 'ricardo@gmail.com', '1967-01-14', 70, '21970312251', '128.308.317-56', 1, 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', '24110221', true, 3);




INSERT INTO tb_visitante (nome, sobrenome, telefone, email, data_Nascimento, idade, curso_id ) VALUES ('Elias ','Jamal Soares','(21)970323353','juneba@gmail.com', '1988-10-07',32, 1);
INSERT INTO tb_visitante (nome, sobrenome,telefone, email, data_Nascimento, idade, curso_id ) VALUES ('Lucas ','Damasco Figueira','(21)970323353','juneba@gmail.com', '1988-10-07', 32, 1);
INSERT INTO tb_visitante (nome, sobrenome,telefone, email, data_Nascimento, idade, curso_id ) VALUES ('Claudio ','Luiz Coutinho','(21)970323353','juneba@gmail.com', '1988-10-07',32, 1);
INSERT INTO tb_visitante (nome, sobrenome, telefone, email, data_Nascimento, idade, curso_id ) VALUES ('Gabril ','Ventura Teixeira','(21)970323353','juneba@gmail.com', '1988-10-07',32, 2);
INSERT INTO tb_visitante (nome, sobrenome, telefone, email, data_Nascimento, idade, curso_id ) VALUES ('Roberto' , 'Rodrigues da cruz','(21)970323353','juneba@gmail.com', '1988-10-07', 32, 2);
INSERT INTO tb_visitante (nome, sobrenome,telefone, email, data_Nascimento, idade, curso_id ) VALUES ('Josue ','Henrique do Carmo','(21)970323353','juneba@gmail.com', '1988-10-07',32, 1);
INSERT INTO tb_visitante (nome, sobrenome,telefone, email, data_Nascimento, idade, curso_id ) VALUES ('Amarildo ', 'Miguel Ribeiro','(21)970323353','juneba@gmail.com', '1988-10-07',32, 1);
INSERT INTO tb_visitante (nome, sobrenome,telefone, email, data_Nascimento, idade, curso_id ) VALUES ('Carla ','Henrique Vieira','(21)970323353','juneba@gmail.com', '1988-10-07',32, 1);
INSERT INTO tb_visitante (nome, sobrenome,telefone, email, data_Nascimento, idade, curso_id ) VALUES ('Bruna ','Homer Silva','(21)970323353','juneba@gmail.com', '1988-10-07',32, 1);
INSERT INTO tb_visitante (nome, sobrenome,telefone, email, data_Nascimento, idade, curso_id ) VALUES ('Ana Cristina ','Henrique Vieira','(21)970323353','juneba@gmail.com', '1988-10-07',32, 1);


INSERT INTO tb_Aluno_Status (id, pendencia) VALUES (1, 'Identidade')
INSERT INTO tb_Aluno_Status (id, pendencia) VALUES (2, 'Assinatura')
INSERT INTO tb_Aluno_Status (id, pendencia) VALUES (3, 'Horários')

INSERT INTO tb_alunos (projeto_id, data_Matricula ,nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca, horario, ativo, abandono) VALUES (3 ,'2024-05-02','Thiago Pereira Fonseca','2010-05-11', 13, 234567899,'Joao Carlos', 1234567-78, '21970312251',  'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, 'https://i.postimg.cc/85qrHB69/Design-sem-nome.png', 'ricardo@gmail.com', 1, 0, '17:00:00', 'true', 'false' );
INSERT INTO tb_alunos (projeto_id, data_Matricula,nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca, horario, ativo, abandono)  VALUES (1 ,'2024-06-07','Joana Lopez Marques','1977-05-11', 13, 234567899, null, null, '21970312251', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, 'https://i.postimg.cc/85qrHB69/Design-sem-nome.png', 'claudio@gmail.com', 1 , 0, '17:00:00', 'true', 'false');
INSERT INTO tb_alunos (projeto_id, data_Matricula,nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, pergunta, aluno_Doenca, horario, ativo, abandono) VALUES (3 ,'2024-07-10' ,'Lucas Soares Fonseca','2005-05-15', 14, 23435432,'Lucia Helenar', 1234567-78, '978956732', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, 'https://i.postimg.cc/85qrHB69/Design-sem-nome.png', 'tereza@gmail.com', 2, 'pressao alta',1, '17:00:00', 'true', 'false');
INSERT INTO tb_alunos (projeto_id, data_Matricula,nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, pergunta ,aluno_Doenca, horario, ativo, abandono) VALUES (3 ,'2024-08-12' ,'Weverton  Henriques Silva ','2009-05-11', 14, 23435432,'Maria Ester', 1234567-78, '978956732', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221,null, 'ricardo@gmail.com', 3 , 'pressao alta',1, '18:00:00', 'true', 'false');
INSERT INTO tb_alunos (projeto_id, data_Matricula,nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, pergunta ,aluno_Doenca, horario, ativo, abandono) VALUES (1 ,'2024-05-07','Alda Chavier Galvão','1979-05-11', 56, 23435432,'', null, '978956732','rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, null, 'ricardo@gmail.com', 1, 'pressao alta',1, '17:00:00', 'true', 'false');
INSERT INTO tb_alunos (projeto_id, data_Matricula,nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca, horario, ativo, abandono) VALUES (1 ,'2024-05-09' ,'Ilza  nobre da Silva  ','1955-05-11', 57, 23435432, null, null, '978956732', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, null, 'ricardo@gmail.com', 3, 1, '18:00:00', 'false', 'false' );
INSERT INTO tb_alunos (projeto_id, data_Matricula,nome, data_nascimento, idade , rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca, horario, ativo, abandono) VALUES (1 ,'2024-05-06' ,'Jamile Hebert Judá  ','1955-05-11', 57, 23435432, null, null, '978956732', 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, null, 'ricardo@gmail.com', null, 1, '17:00:00', 'true', 'false' );
INSERT INTO tb_alunos (projeto_id, data_Matricula,nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, pergunta ,aluno_Doenca, horario, ativo, abandono) VALUES (1 ,'2024-07-02' ,'Marieta Loureiro da Silva  ','1955-05-11', null, 23435432, null, null, '978956732' , 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, null, 'joseo@gmail.com', null, 'pressao alta',1, '19:00:00', 'true', 'false');
INSERT INTO tb_alunos (projeto_id, data_Matricula,nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca, horario, ativo, abandono) VALUES (1 ,'2024-08-17' ,'Carla Moreno da Silva  ','1955-05-11', 57, 23435432, null, null, '978956732' , 'rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, null, 'ricardo@gmail.com', null, 1, '18:00:00' , 'true', 'false');
INSERT INTO tb_alunos (projeto_id, data_Matricula,nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca, horario, ativo, abandono) VALUES (1 ,'2024-05-22' ,'Lucia kaiser da Costa  ','1955-05-11', 57, 23435432, null, null, '978956732',' rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, null, 'lucas@gmail.com',null, 1, '19:00:00', 'true', 'false' );
INSERT INTO tb_alunos (projeto_id, data_Matricula,nome, data_nascimento, idade, rg, responsavel, cpf_responsavel, telefone, rua, bairro, numero, cidade, complemento, cep, url, email, status_id, aluno_Doenca, horario, ativo, data_Inativo, abandono) VALUES (3 ,'2024-07-30' ,'Herbet de Souza  ','1982-07-11', 57, 23435432, null, null, '978956732',' rua Dalva raposo', 'Maria Paula', 35 , 'são gonçalo', 'bloco 07 ap 202', 24110221, null, 'lucas@gmail.com',null, 0, '19:00:00', 'false', '2024-08-23', 'false' );

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
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-04-23', 1, 1, 2)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-04-27', 1, 1, 2)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-05-01', 1, 1, 2)
INSERT INTO tb_lista_presenca (data, chamada_aluno, aluno_id, projeto_id) VALUES ('2024-05-04', 1, 1, 2)


INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-05','PRESENTE', 1 , 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-05', 'PRESENTE', 2, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-05', 'PRESENTE', 3, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-05', 'AUSENTE', 4, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-05', 'PRESENTE', 5, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-05', 'PRESENTE', 6, 2)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-05', 'PRESENTE', 7, 2)

INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-12','PRESENTE', 1 , 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-12', 'PRESENTE', 2, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-12', 'PRESENTE', 3, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-12',  'PRESENTE', 4, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-12', 'PRESENTE', 5, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-12', 'PRESENTE', 6, 2)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-12', 'PRESENTE', 7, 2)


INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-19','PRESENTE', 1 , 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-19', 'PRESENTE', 2, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-19', 'PRESENTE', 3, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-19', 'AUSENTE', 4, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-19', 'PRESENTE', 5, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-19', 'AUSENTE', 6, 2)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-19', 'PRESENTE', 7, 2)

INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-26','AUSENTE', 1 , 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-26', 'PRESENTE', 2, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-26', 'PRESENTE', 3, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-26',  'PRESENTE', 4, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-26', 'PRESENTE', 5, 1)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-26', 'PRESENTE', 6, 2)
INSERT INTO tb_lista_presenca_Ebd (data, chamada_Membro, membro_id ,curso_id) VALUES ('2024-05-26', 'PRESENTE', 7, 2)


INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-05', 'PRESENTE', 1, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-05', 'AUSENTE', 2, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-05', 'PRESENTE', 3, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-05', 'AUSENTE', 4, 2)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-05', 'PRESENTE', 5, 2)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-12', 'PRESENTE', 1, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-12', 'PRESENTE', 2, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-12', 'AUSENTE', 3, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-19', 'PRESENTE', 1, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-19', 'PRESENTE', 2, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-19', 'PRESENTE', 3, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-26', 'PRESENTE', 1, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-26', 'PRESENTE', 2, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-26', 'AUSENTE', 3, 1)


INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-5', 'PRESENTE', 6, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-5', 'PRESENTE', 7, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-5', 'PRESENTE', 8, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-5', 'PRESENTE', 9, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-5', 'PRESENTE', 10, 1)

INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-12', 'PRESENTE', 6, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-12', 'PRESENTE', 7, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-12', 'PRESENTE', 8, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-12', 'AUSENTE', 9, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-12', 'PRESENTE', 10, 1)

INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-19', 'PRESENTE', 6, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-19', 'PRESENTE', 7, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-19', 'PRESENTE', 8, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-19', 'PRESENTE', 9, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-19', 'PRESENTE', 10, 1)





INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-26', 'PRESENTE', 6, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-26', 'PRESENTE', 7, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-26', 'PRESENTE', 8, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-26', 'AUSENTE', 9, 1)
INSERT INTO tb_lista_presenca_Visitante_Ebd (data, chamada_Visitante, visitante_id ,curso_id) VALUES ('2024-05-26', 'PRESENTE', 10, 1)




INSERT INTO tb_pagamento (valor, data_pagamento, forma_pagamento, mes_referencia, atrasado ,aluno_id) VALUES (50,'2024-07-10', 'DINHEIRO', 'JUNHO', 50, 1 )
INSERT INTO tb_pagamento (valor, data_pagamento, forma_pagamento, mes_referencia, atrasado, aluno_id) VALUES (50,'2024-07-10', 'PIX', 'ABRIL', 50, 2 )
INSERT INTO tb_pagamento (valor, data_pagamento, forma_pagamento, mes_referencia, atrasado, aluno_id) VALUES (50,'2024-07-01', 'PIX', 'JULHO', 50, 3 )
INSERT INTO tb_pagamento (valor, data_pagamento, forma_pagamento, mes_referencia, atrasado, aluno_id) VALUES (50,'2024-07-05', 'DINHEIRO', 'JULHO', 50, 4 )
INSERT INTO tb_pagamento (valor, data_pagamento, forma_pagamento, mes_referencia, atrasado, aluno_id) VALUES (50,'2024-07-05', 'DINHEIRO', 'JULHO', 50, 5 )
INSERT INTO tb_pagamento (valor, data_pagamento, forma_pagamento, mes_referencia, atrasado, aluno_id) VALUES (50,'2024-07-05', 'DINHEIRO', 'JULHO' , 50, 6)
INSERT INTO tb_pagamento (valor, data_pagamento, forma_pagamento, mes_referencia, atrasado, aluno_id) VALUES (50,'2024-07-15', 'PIX', 'JULHO' , 50, 7)
INSERT INTO tb_pagamento (valor, data_pagamento, forma_pagamento, mes_referencia, atrasado ,aluno_id) VALUES (50,'2024-04-10', 'DINHEIRO', 'ABRIL', 50, 1 )
INSERT INTO tb_pagamento (valor, data_pagamento, forma_pagamento, mes_referencia, atrasado ,aluno_id) VALUES (50,'2024-03-13', 'PIX', 'MARCO', 50, 1 )
INSERT INTO tb_pagamento (valor, data_pagamento, forma_pagamento, mes_referencia, atrasado ,aluno_id) VALUES (50,'2024-08-14', 'DINHEIRO', 'AGOSTO', 50, 1 )
INSERT INTO tb_pagamento (valor, data_pagamento, forma_pagamento, mes_referencia, atrasado ,aluno_id) VALUES (50,'2024-07-10', 'PIX', 'JULHO', 50, 1 )
INSERT INTO tb_pagamento (valor, data_pagamento, forma_pagamento, mes_referencia, atrasado ,aluno_id) VALUES (50,'2024-10-17', 'PIX', 'OUTUBRO', 50, 1 )


INSERT INTO tb_entrada (entrada, valor, forma_pagamento, mes_referencia) VALUES ('Atrasado Abril', 50, 'PIX', 'JUNHO')
INSERT INTO tb_entrada (entrada, valor, forma_pagamento, mes_referencia) VALUES ('Atrasado Abril', 50, 'PIX', 'JUNHO')
INSERT INTO tb_entrada (entrada, valor, forma_pagamento, mes_referencia) VALUES ('Atrasado Abril', 50, 'DINHEIRO','JULHO')
INSERT INTO tb_entrada (entrada, valor, forma_pagamento, mes_referencia) VALUES ('Atrasado maio', 50, 'PIX','JULHO')
INSERT INTO tb_entrada (entrada, valor, forma_pagamento, mes_referencia) VALUES ('Atrasado maio', 50, 'PIX', 'JULHO')


INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 22, 10, '2024-07-07' , 32 ,17, 15, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 22, 20, '2024-07-14' , 42 ,27, 15, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 30, 20, '2024-07-21' , 50 ,27, 23, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 22, 10, '2024-07-28' , 32 ,17, 15, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 22, 10, '2024-08-07' , 32 ,17, 15, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 22, 30, '2024-08-14' , 52 ,30, 12, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 70, 50, '2024-09-21' , 120 ,50, 70, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 40, 55, '2024-09-28' , 95 , 45, 50, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 35, 55, '2024-09-28' , 90 , 40, 50, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 60, 50, '2024-09-28' , 110 , 55, 55, 1 );


INSERT INTO tb_requerimento(data_Requerimento, data_Evento, data_Aprovacao, data_Pagamento, status_Requerimento , pergunta1, pergunta2, responsavel, email_Responsavel ,local, Total ) VALUES ( '2024-07-07', '2024-07-07', '2024-09-28' , '2024-09-28' , 'APROVADO','festa da roça', 'comunhao da igreja', 'Junior', 'junebajuneba@gmail.com' ,'Igreja', 187.37);
INSERT INTO tb_requerimento(data_Requerimento, data_Evento, data_Aprovacao, data_Pagamento, status_Requerimento , pergunta1, pergunta2, responsavel, email_Responsavel ,local, Total ) VALUES ( '2024-07-07', '2024-07-10', '2024-09-30' , '2024-09-20' , 'RECUSADO' ,'festa da primavera', 'comunhao da igreja', 'Aurici', 'junebajuneba@gmail.com','Igreja', 37.79);
INSERT INTO tb_requerimento(data_Requerimento, data_Evento, data_Aprovacao, data_Pagamento, status_Requerimento , pergunta1, pergunta2, responsavel, email_Responsavel ,local, Total ) VALUES ( '2024-07-07', '2024-07-07', '2024-09-28' , '2024-09-28' , 'PENDENTE' ,'festa da roça', 'comunhao da igreja', 'Junior', 'junebajuneba@gmail.com','Igreja', 187.37);
INSERT INTO tb_requerimento(data_Requerimento, data_Evento, data_Aprovacao, data_Pagamento, status_Requerimento , pergunta1, pergunta2, responsavel, email_Responsavel ,local, Total ) VALUES ( '2024-07-07', '2024-07-07', '2024-09-28' , '2024-09-28' ,'PENDENTE','festa da roça', 'comunhao da igreja', 'Junior', 'junebajuneba@gmail.com','Igreja', 187.37);
INSERT INTO tb_requerimento(data_Requerimento, data_Evento, data_Aprovacao, data_Pagamento, status_Requerimento , pergunta1, pergunta2, responsavel, email_Responsavel ,local, Total ) VALUES ( '2024-07-07', '2024-07-07', '2024-09-28' , '2024-09-28' , 'PENDENTE','festa da roça', 'comunhao da igreja', 'Junior', 'junebajuneba@gmail.com','Igreja', 187.37);



INSERT INTO tb_produto(nome, preço, requerimento_id) VALUES ( 'hamburguer', 120.97, 1);
INSERT INTO tb_produto(nome, preço, requerimento_id) VALUES ( 'ovo', 20.90, 1);
INSERT INTO tb_produto(nome, preço, requerimento_id) VALUES ( 'pão', 45.50, 1);
INSERT INTO tb_produto(nome, preço, requerimento_id) VALUES ( 'batata', 37.79, 2);
INSERT INTO tb_produto(nome, preço, requerimento_id) VALUES ( 'café', 20.00, 2);
INSERT INTO tb_produto(nome, preço, requerimento_id) VALUES ( 'leite', 06.79, 2);
INSERT INTO tb_produto(nome, preço, requerimento_id) VALUES ( 'açucar', 2.79, 2);



INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 22, 10, '2024-06-07' , 32 ,17, 15, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 22, 20, '2024-06-14' , 42 ,27, 15, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 30, 20, '2024-06-21' , 50 ,27, 23, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 22, 10, '2024-05-28' , 32 ,17, 15, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 22, 10, '2024-05-07' , 32 ,17, 15, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 22, 30, '2024-05-14' , 52 ,30, 12, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 32, 10, '2024-04-21' , 42 ,27, 15, 1 );
INSERT INTO tb_quantidade_culto (visitante, membro, data, total ,numero_Mulher, numero_Homem, Tipo_Culto ) VALUES ( 22, 10, '2024-04-28' , 32 ,17, 15, 1 );




INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-05', 1, 'teste1','teste2','teste3','teste4','teste5')
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-05', 2, 'Sim, a aula ocorreu sem problemas.', 'Não, nenhum aluno apresentou problemas.', 'Não, o material das aulas foi suficiente e compreensível.', 'Seria útil fornecer mais exemplos práticos durante as aulas.', 'Não, nada mais a observar no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-05', 3, 'Sim, a aula ocorreu normalmente.', 'Sim, um aluno apresentou dificuldades de aprendizagem.', 'Sim, alguns alunos tiveram dificuldade com o material das aulas.', 'A equipe de trabalho poderia disponibilizar mais recursos online para estudo.', 'Nenhuma observação adicional no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-10', 1, 'Não, houve atraso na chegada do professor.', 'Não, todos os alunos participaram ativamente.', 'Não, o material das aulas foi bem preparado.', 'Seria útil organizar uma revisão geral antes de exames.', 'Nenhuma observação adicional no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-10', 2, 'Sim, mas houve um problema técnico no meio da aula.', 'Não, os alunos estavam engajados.', 'Sim, alguns alunos pediram material adicional.', 'A equipe de trabalho poderia criar grupos de estudo online.', 'Nenhuma observação adicional no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-10', 3, 'Não, a aula foi cancelada devido a problemas técnicos.', 'Não, nenhum problema foi relatado.', 'Sim, alguns alunos acharam o material muito avançado.', 'Seria útil disponibilizar tutoriais online.', 'Nenhuma observação adicional no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-23', 1, 'Sim, mas houve uma interrupção breve.', 'Sim, um aluno precisou de ajuda extra.', 'Não, o material foi bem compreendido pela maioria.', 'Seria útil criar um fórum online para discussões.', 'Nenhuma observação adicional no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-23', 2, 'Não, houve atraso na chegada do professor.', 'Sim, um aluno precisou de ajuda extra.', 'Não, o material foi bem compreendido pela maioria.', 'Seria útil criar um fórum online para discussões.', 'Nenhuma observação adicional no momento.');
INSERT INTO tb_relatorio (data, projeto_id, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5) VALUES ('2024-04-23', 3, 'Sim, mas houve uma interrupção breve.', 'Sim, um aluno precisou de ajuda extra.', 'Não, o material foi bem compreendido pela maioria.', 'Seria útil criar um fórum online para discussões.', 'Nenhuma observação adicional no momento.');

