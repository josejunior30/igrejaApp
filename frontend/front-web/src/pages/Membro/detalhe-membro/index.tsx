import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MembroDetail } from "./types";
import './styles.css';
import { MdEmail } from "react-icons/md";
import { FaChevronRight,FaChevronLeft, FaPhoneVolume } from "react-icons/fa";

const Detalhes = () => {
  const { id } = useParams<{ id: string }>() ?? { id: "" }; // Fornecendo uma string vazia como valor padrão
  const navigate = useNavigate();
  const [membroDetail, setMembroDetail] = useState<MembroDetail>(); // Estado para armazenar os detalhes do membro
  const [loading, setLoading] = useState(true);

  const getColorClassForPequenoGrupo = (id: number): string => {
    switch (id) {
      case 1:
        return "pg-id1";
      case 2:
        return "pg-id2";
      case 3:
        return "pg-id3";
        case 4:
          return "pg-id4";// Adicione mais casos conforme necessário
      default:
        return ""; // Adicione uma classe padrão ou deixe vazio para a cor padrão
    }
  };

  const loadMembroDetails = (membroId: string) => {
    axios.get(`http://localhost:8080/membro/${membroId}`)
      .then(response => {
        console.log("Detalhes do Membro:", response.data);
        setMembroDetail(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar detalhes do membro:", error);
        // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) { // Verifica se id não é undefined ou vazio
      loadMembroDetails(id);
    }
  }, [id]);



  const handleNextClick = () => {
    if (id !== undefined) {
      const nextId = parseInt(id, 10) + 1;
      navigate(`/secretaria/membro/${nextId}`);
    }
  };

  const handlePreviousClick = () => {
    if (id !== undefined) {
      const previousId = parseInt(id, 10) - 1;
      if (previousId > 0) {
        navigate(`/secretaria/membro/${previousId}`);
      }
    }
  };

  return (
    <>
    <div className="membro-container">
      {membroDetail ? (
        <div className="detalhe-container">
          <div className="conteudo-centralizado">
          <img src={membroDetail.url} alt="Foto do Membro" className="foto-membro" />
            <span className="nome-id">{membroDetail.nome} {membroDetail.sobrenome}</span>
            <p className="dados"> CPF: {membroDetail.cpf}</p>
            <p className="dados"> Estado Civil: {membroDetail.estadoCivil}</p>
            <p className="dados">Data de Nascimento: {new Date(membroDetail.dataNascimento).toLocaleDateString()}</p>
            <p className="dados"><span><MdEmail /></span>  Email: {membroDetail.email}</p>
            <p className="dados"><span><FaPhoneVolume /></span>  Telefone: {membroDetail.telefone}</p>
         
            {membroDetail.pequenoGrupo && (
              <div >
                
                <p className="dados">
      Pequeno Grupo:{" "}
      <span
        className={`pg ${getColorClassForPequenoGrupo(membroDetail.pequenoGrupo.id)}`}
      >
        {membroDetail.pequenoGrupo.apelido}
      </span>
    </p>
            </div>
            )}
          </div>
          <div className="botoes-container">
            <button className="botao-editar">Editar</button>
            <button className="botao-deletar">Deletar</button>
          </div>
        </div>
      ) : (
        <p>Carregando detalhes do membro...</p>
      )}
    </div>
    <div className="setas">
      <button onClick={handlePreviousClick} className="btn-left"> <FaChevronLeft /></button>
      <button onClick={handleNextClick} className="btn-right"><FaChevronRight /></button>
    </div>

    <Link to="/secretaria/membro">
       <button className="botao-voltar">voltar</button>
     </Link>
       </>
  );
};

export default Detalhes;
