import { useEffect, useState } from "react";
import { findAll, findByDate, findDataAndProjeto } from "../../service/presencaService";
import { PresencaDTO } from "../../models/presenca";
import './styles.css';
import Header from "../../components/Header";

import { PiPrinterFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import Projetos from "../Projetos";


  
  
const Presenca = () => {
  
  const [dataEscolhida, setDataEscolhida] = useState("");
  const [projeto, setProjeto] = useState<number | null>(null); 
  const [presencas, setPresencas] = useState<PresencaDTO[]>([]);
  
  
  useEffect(() => {
    fetchPresencas();
  }, []);

  const fetchPresencas = () => {
    findAll()
      .then((response) => {
        console.log("Presenças recebidas:", response.data);
        setPresencas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar presenças:", error);
      });
  };


  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataEscolhida(event.target.value);
  };

  const handleProjetoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const projectId = event.target.value === "null" ? null : Number(event.target.value);
    setProjeto(projectId);
  };
  
  
  const buscarPresencasPorDataEProjeto = () => {
    if (!dataEscolhida) {
      console.error("Data não especificada.");
      return;
    }
  
    let dataFormatada = new Date(dataEscolhida);
  
    if (projeto === null) {
      findByDate(dataFormatada)
        .then((response) => {
          console.log("Alunos recebidos:", response.data);
          setPresencas(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar alunos por data:", error);
        });
    } else {
      findDataAndProjeto(dataFormatada, projeto)
        .then((response) => {
          console.log("Presenças recebidas:", response.data);
          setPresencas(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar presenças por data e projeto:", error);
        });
    }
  };
  

  return (
    <>
    <Header/>
 
  

   <div className="container-fluid mt-5 pt-5">

   <div className="row" id="voltar">
         <div className="col">
            <Link to= "/membro">
              <TiArrowBack />   Voltar
          </Link>
        </div>
    
         
    </div>

    <div className="container col-11 col-md-7">
    <div className="row  justify-content-center"  id="pesquisa-chamada">
    <div className="col-md-4 col-8">
    <h3>Lista de Presença</h3>
    
    <label htmlFor="dataEscolhida"  className="form-label">Escolha a data:</label>
    <input
      type="date"
      id="dataEscolhida"
      value={dataEscolhida}
      onChange={handleDataChange}
      className="form-control"
    />
      
      </div>
      <div className="col-md-12 p-4 ">
           
      <label htmlFor="projeto1 " className="form-check-label me-1 "id="artesanato" >Artesanato</label>
          <input
            type="radio"
            id="projeto1"
            value="1"
            checked={projeto === 1}
            onChange={handleProjetoChange}
        
          />
          <label htmlFor="projeto2" className="form-check-label me-1 " >Jiu-Jitsu</label>
          <input
            type="radio"
            id="projeto2"
            value="2"
            checked={projeto === 2}
            onChange={handleProjetoChange}
        
          />
          <label htmlFor="projeto3" className="form-check-label me-1 " >Teclado</label>
          <input
            type="radio"
            id="projeto3"
            value="3"
            checked={projeto === 3}
            onChange={handleProjetoChange}
          
          />
             <label htmlFor="projeto4" className="form-check-label me-1 " >Canto</label>
          <input
            type="radio"
            id="projeto4"
            value="4"
            checked={projeto === 4}
            onChange={handleProjetoChange}
        
          />
          <label htmlFor="projeto5" className="form-check-label me-1 " >Bateria</label>
          <input
            type="radio"
            id="projeto"
            value="5"
            checked={projeto === 5}
            onChange={handleProjetoChange}
          
          />
           <label htmlFor="projeto5" className="form-check-label me-1 " > violão e Guitarra</label>
          <input
            type="radio"
            id="projeto"
            value="6"
            checked={projeto === 6}
            onChange={handleProjetoChange}
          
          />
<label htmlFor="projetoTodos" className="form-check-label " >Todos</label>
<input
  type="radio"
  id="projetoTodos"
  value="null"
  checked={projeto === null}
  onChange={handleProjetoChange}
  
/>

        </div>
      
        <div className=" d-grid gap-2 col-4 mx-auto " >
        <button className= "btn btn-primary mb-2 "  onClick={buscarPresencasPorDataEProjeto}>Buscar</button>
          
          </div>
      </div>

      <div className="row justify-content-center mt-4 text-center">
      <div className="col-md-11 col-11">
      <div className="img-print-lista">
    <Link to="#">
        <p><PiPrinterFill /> Imprimir</p>
    </Link>
     </div>
      <table className="table table-striped">
      <thead className="thead">
        <tr>
            <th scope="col">Aluno</th>
            <th scope="col">Presença</th>
            <th scope="col">Projeto</th>
          </tr>
      </thead>
      <tbody>
        {presencas.length > 0 ? (
              presencas.map((presenca:any) => (
            <tr key={presenca.id}>
              <td>{presenca.alunos ? presenca.alunos.nome : 'Aluno não encontrado'}</td>
              <td>{presenca.chamadaAluno}</td>
              <td>{presenca.projetosChamada ? presenca.projetosChamada.nome : 'Projeto não encontrado'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>Nenhuma presença encontrada</td>
          </tr>
        )}

        </tbody>

        </table>
        </div>
       
        </div>
   </div>


</div>

    </>
  );
  
};

export default Presenca;