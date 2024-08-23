import { useEffect, useState } from "react";
import { alunosPG } from "../../../models/alunos";
import { Link, useParams } from "react-router-dom";
import * as alunosService from '../../../service/alunosService';
import Header from "../../../components/Header";
import { Pagamento } from "../../../models/pagamento";
import { CgDanger } from "react-icons/cg";

const AlunoPagamentos = () => {
  const { id } = useParams<{ id: string }>() ?? { id: "" };
  
 const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [alunosDTO, setAlunosDTO] = useState<alunosPG>();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const estacao = 'https://i.postimg.cc/zX9nQ80Q/Esta-o-siba-250-x-150-mm-250-x-100-mm.png';

  const loadAlunosDTO = (id: string) => {
    alunosService.findById(Number(id))
      .then(response => {
        console.log("Detalhes do Membro:", response.data);
        setAlunosDTO(response.data);
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
      loadAlunosDTO(id);
    }
  }, [id]);

 
 


  

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="row justify-content-center">
          {alunosDTO ? (
            <>
              <div className="col-md-4 col-9 m-5 md-5 pb-3 text-center" id="dados">
                <img src={alunosDTO.url ?? "-----"} alt="Foto do Membro" className="img-fluid mb-3 rounded mx-auto d-block " />
                <span className="nome-id">{alunosDTO.nome ?? "-----"}</span>
                
                <p className="dados"><span>Idade:</span> {alunosDTO.idade ?? "-----"}</p>
                <p className="dados"><span>Data de Nascimento:</span> {alunosDTO.dataNascimento ? new Date(alunosDTO.dataNascimento).toLocaleDateString() : "-----"}</p>
                <p className="dados"><span>Email: </span>{alunosDTO.email ?? "-----"}</p>
                <p className="dados"><span>Responsável: </span>{alunosDTO.responsavel ?? "-----"}</p>
                <p className="dados"><span>CPF Responsável: </span>{alunosDTO.cpfResponsavel ?? "-----"}</p>
                <p className="dados"><span>Doença: </span><span className="dados-doença">{alunosDTO.pergunta ?? "-----"}</span></p>
                {alunosDTO.pagamento && (
                  <p className="dados-Projeto"><span> Projeto: {alunosDTO.pagamento.valor} </span> </p>
                  
               
               )}
              </div>
             
            </>
          ) : (
            <p>Carregando detalhes do membro...</p>
          )}
        </div>
      
      </div>
    </>
  );
};
export default AlunoPagamentos;
