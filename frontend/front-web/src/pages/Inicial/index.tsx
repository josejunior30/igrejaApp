import React from "react";
import Calendario from "../../assests/calendario.jpg";
import Secretaria from "../../assests/secretaria.jpg";
import Visitante from "../../assests/visitante.jpg";
import Lideranca from "../../assests/liderenca.jpg";
import Pg from "../../assests/pequenoGrupo.jpg";
import Financeiro from "../../assests/financeiro.jpg";
import { Link } from "react-router-dom";
import './styles.css';
import Header from "../../components/Header";

const projetos ='https://i.postimg.cc/XJnWvPsT/Whats-App-Image-2024-03-20-at-22-06-16.jpg'
const financeiro = 'https://i.postimg.cc/QdwmwPQs/financeiro.jpg'
const lideranca = 'https://i.postimg.cc/Pq3Pxsqv/liderenca.jpg'
const pg= 'https://i.postimg.cc/sDMXn0w3/pequeno-Grupo.jpg'
const secretaria = 'https://i.postimg.cc/TYvd9YLJ/secretaria.jpg'
const visitante = 'https://i.postimg.cc/TYvd9YLJ/secretaria.jpg'
const Inicial = () => (
  <>
    <Header/>
    <div className="text-container">
      <h2>Bem Vindo !</h2>
      <p>Escolha uma seção</p>
    </div>

    <div className="image-container">
      
      <div className="image">
        <img src={financeiro} alt="Calendario" />
        <div className="overlay">
          
          <p>Tesouraria</p>
          <Link to="#">
          <button>Clique aqui</button>
          </Link>
        </div>
  </div>

      <div className="image">
        <img src={secretaria} alt="Scretaria" />
        <div className="overlay">
        
          <p>Secretaria</p>
          <Link to="/membro">
          <button>Clique aqui</button>

          </Link>
          </div>
        
      </div>

      <div className="image">
        <img src={lideranca} alt="Calendario" />
        <div className="overlay">
          <p>Liderança</p>
          <Link to="#">
          <button>Clique aqui</button>
          </Link>
        </div>
      </div>

      <div className="image">
        <img src={pg} alt="Calendario" />
        <div className="overlay">
          <p>Pequeno Grupo</p>
          <Link to= "/pg">
          <button>Clique aqui</button>
          </Link>
        </div>
      </div>

      <div className="image">
        <img src={projetos}  alt="Calendario" />
        <div className="overlay">
          <p>Projeto</p>
          <Link to="/projetos">
          <button>Clique aqui</button>
          </Link>
        </div>
      </div>

      <div className="image">
        <img src={visitante} alt="Calendario" />
        <div className="overlay">
          <p>Visitante</p>
        <Link to="#">
          <button>Clique aqui</button>
          </Link>
        </div>
      </div>
    

    </div>
  </>
);

export default Inicial;
