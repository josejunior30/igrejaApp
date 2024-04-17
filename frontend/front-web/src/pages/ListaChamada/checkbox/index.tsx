import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as projetosService from "../../../service/projetosService";
import { alunos, projetosDTO } from "../../../models/projetos";
import Header from "../../../components/Header";
import { TiArrowBack } from "react-icons/ti";
import { ListaChamadaDTO } from "../../../models/ListaChamada";
import { PresencaDTO } from "../../../models/presenca";
import *as presencaService from "../../../service/presencaService";
import axios from "axios";

import './styles.css';
import { GiConfirmed } from "react-icons/gi";
const PresençaBox = () => {
    const { id } = useParams<{ id: string }>() ?? { id: "" };
    const [projetosDTO, setProjetosDTO] = useState<projetosDTO>();
    const [loading, setLoading] = useState(true);
    const [listaDeAlunos, setListaDeAlunos] = useState<alunos[]>([]);
    const [presencas, setPresencas] = useState<PresencaDTO[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
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
    

    const handleCheckboxChange = (alunoId: number, tipoPresenca: 'presente' | 'ausente' | 'justificada', isChecked: boolean) => {
      const updatedPresencas = presencas ? [...presencas] : [];

      let index = updatedPresencas.findIndex(p => p.alunos.id === alunoId);

      if (index === -1) {
          updatedPresencas.push({
              id: 0,
              data: new Date(),
              chamadaAluno: 0,
              alunos: {
                  id: alunoId,
                  nome: ""
              },
              projetosChamada: {
                  id: projetosDTO?.id ?? 0,
                  nome: ""
              }
          });
          index = updatedPresencas.length - 1;
      }

      switch (tipoPresenca) {
          case 'presente':
              updatedPresencas[index].chamadaAluno = isChecked ? 0 : 0;
              break;
          case 'ausente':
              updatedPresencas[index].chamadaAluno = isChecked ? 1 : 0;
              break;
          case 'justificada':
              updatedPresencas[index].chamadaAluno = isChecked ? 2 : 0;
              break;
          default:
              break;
      }

      setPresencas(updatedPresencas);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedDate(e.target.value);
      const updatedPresencas = presencas.map(p => ({
          ...p,
          data: new Date(e.target.value),
      }));
      setPresencas(updatedPresencas);
  };

  const enviarListaDePresenca = () => {
    presencas.forEach(presenca => {
        presencaService.insert(presenca)
            .then(response => {
                console.log("Presença enviada com sucesso:", response.data);
                setShowModal(true);
            })
            .catch(error => {
                console.error("Erro ao enviar presença:", error);
            });
    });
};
const closeModal = () => {
  setShowModal(false);
  navigate(-1); // Navegar de volta para a página anterior
};

    return (
      <>
   <Header/>
   <div className="voltar-lista">
      <Link to="/projetos">
        <TiArrowBack />  Voltar
      </Link>
    </div>
   
    <div className="date-picker-container">
                    <label htmlFor="datePicker">Escolha a data:</label>
                    <input 
                        type="date" 
                        id="datePicker" 
                        value={selectedDate} 
                        onChange={handleDateChange} 
                    />
         <button onClick={enviarListaDePresenca} className="enviar-chamada">Enviar</button>
         
          </div>

        <div className="criar-chamanda-container">
       
          {projetosDTO && (
            <table className="alunos-chamada-table" cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
            
                  <th>Nome</th>
                  <th>Projeto</th>
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
                      <Link to={`/alunos/${aluno.id}`} className="chamada-alunos">
                        {aluno.nome}
                        </Link>
                     </td>
                     <td >
                      <Link to={`/alunos/${aluno.id}`} className="chamada-alunos">
                        {projetosDTO.nome}
                        </Link>
                     </td>
                     <td>
                     <input
    type="checkbox"
    id={`presente-${aluno.id}`}
    value="presente"
    onChange={(e) => handleCheckboxChange(aluno.id, 'presente', e.target.checked)}
/>
                     </td>
                     <td>
                     <input
    type="checkbox"
    id={`ausente-${aluno.id}`}
    value="ausente"
    onChange={(e) => handleCheckboxChange(aluno.id, 'ausente', e.target.checked)}
/>
                     </td>
                     <td>
                     <input
    type="checkbox"
    id={`justificada-${aluno.id}`}
    value="justificada"
    onChange={(e) => handleCheckboxChange(aluno.id, 'justificada', e.target.checked)}
/>
                     </td>
                  </tr>
                  ))
                )}
                
              </tbody>
            
            </table>
            
          )}
           
            {showModal && (
                <div className="modal-chamada">
                    <div className="modal-chamada-content">
                   
                        <h2>Lista de Presença <span><GiConfirmed /></span></h2>
                        <h3> Enviada com sucesso!</h3>
                        <button onClick={closeModal} >OK</button>
                    </div>
                </div>
            )}
        </div>
      </>
    );
   };
  
  export default PresençaBox;
  