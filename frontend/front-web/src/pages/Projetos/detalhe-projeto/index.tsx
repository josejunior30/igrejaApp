import React, { useEffect, useState } from "react";
import { projetosDTO } from "../../../models/projetos";
import { Link, useParams } from "react-router-dom";
import * as projetosService from '../../../service/projetosService';

const DetalheProjetos = () => {
  const { id } = useParams<{ id: string }>() ?? { id: "" };
  const [projetosDTO, setProjetosDTO] = useState<projetosDTO>();
  const [loading, setLoading] = useState(true);

  const loadProjetosDTO = (id: string) => {
    projetosService.findById(Number(id))
      .then(response => {
        console.log("Detalhes do Membro:", response.data);
        setProjetosDTO(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar detalhes do membro:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      loadProjetosDTO(id);
    }
  }, [id]);

  return (
    <div>
      <div className="membro-container">
        {projetosDTO ? (
          <div className="detalhe-container">
            <div className="conteudo-centralizado">
              <img src={projetosDTO.foto_lider} alt="Foto do Membro" className="foto-membro" />
              <span className="nome-id">{projetosDTO.lider}</span>

              {projetosDTO.alunos && (
                <div>
                  {projetosDTO.alunos.map((aluno, index) => (
                    <p key={index} className="dados">
                      <span>{aluno.nome}</span>
                      {aluno.idade}
                    </p>
                  ))}
                </div>
              )}

              <div className="botoes-container">
                <Link to="#">
                  <button className="botao-editar">Editar</button>
                </Link>
                <button className="botao-deletar">Deletar</button>
              </div>
            </div>
          </div>
        ) : (
          <p>Carregando detalhes do membro...</p>
        )}
      </div>
    </div>
  );
};

export default DetalheProjetos;
