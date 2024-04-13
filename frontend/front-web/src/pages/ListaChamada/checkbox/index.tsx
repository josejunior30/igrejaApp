import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as projetosService from "../../../service/projetosService";
import { alunos, projetosDTO } from "../../../models/projetos";
import Header from "../../../components/Header";
import { TiArrowBack } from "react-icons/ti";
import { ListaChamadaDTO } from "../../../models/ListaChamada";
const PresençaBox = () => {
    const { id } = useParams<{ id: string }>() ?? { id: "" };
    const [projetosDTO, setProjetosDTO] = useState<projetosDTO>();
    const [loading, setLoading] = useState(true);
    const [listaDeAlunos, setListaDeAlunos] = useState<alunos[]>([]);
    const [presencas, setPresencas] = useState<ListaChamadaDTO>();

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
    useEffect(() => {
      console.log("Dados de projetosDTO:", projetosDTO);
    }, [projetosDTO]);
  
    return (
      <>
   <Header/>
   <div className="voltar-projetos-detalhes">
      <Link to="/projetos">
        <TiArrowBack />  Voltar
      </Link>
    </div>
        <div className="alunos-pj-container">
       
          {projetosDTO && (
            <table className="alunos-table" cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
            
                  <th>Nome</th>
                  <th>Presente</th>
                  <th>Ausente</th>
                  <th>Justificada</th>
                
                </tr>
              </thead>
              <tbody>
                {projetosDTO.alunos && (
                  projetosDTO.alunos.map((aluno) => (
                    <tr key={aluno.id}>
                    
                      <td >
                      <Link to={`/alunos/${aluno.id}`} className="dados-alunos">
                        {aluno.nome}
                        </Link>
                     </td>
                     <td>
                     <input
                      type="checkBox"
                      id={`presente`}
                      value="presente"
                    />
                     </td>
                     <td>
                     <input
                      type="checkBox"
                      id={`ausente`}
                      value="ausente"
                    />
                     </td>
                     <td>
                     <input
                      type="checkBox"
                      id={`justificada`}
                      value="justificada"
                    />
                     </td>
                  </tr>
                  ))
                )}
                
              </tbody>
            
            </table>
            
          )}
            <button>Enviar</button>
        </div>
      </>
    );
   };
  
  export default PresençaBox;
  