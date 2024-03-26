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

const Inicial = () => (
  <>
    <Header/>
    <div className="text-container">
      <h2>Bem Vindo, Junior !</h2>
      <p>Escolha uma seção</p>
    </div>

    <div className="image-container">
      
      <div className="image">
        <img src={Financeiro} alt="Calendario" />
        <div className="overlay">
          
          <p>Tesouraria</p>
          <Link to="#">
          <button>Clique aqui</button>
          </Link>
        </div>
  
  </div>

      <div className="image">
        <img src={Secretaria} alt="Calendario" />
        <div className="overlay">
        
          <p>Secretaria</p>
          <Link to="/secretaria">
          <button>Clique aqui</button>

          </Link>
          </div>
        
      </div>

      <div className="image">
        <img src={Lideranca} alt="Calendario" />
        <div className="overlay">
          <p>Liderança</p>
          <Link to="#">
          <button>Clique aqui</button>
          </Link>
        </div>
      </div>

      <div className="image">
        <img src={Pg} alt="Calendario" />
        <div className="overlay">
          <p>Pequeno Grupo</p>
          <Link to= "/pg">
          <button>Clique aqui</button>
          </Link>
        </div>
      </div>

      <div className="image">
        <img src={Visitante} alt="Calendario" />
        <div className="overlay">
          <p>Visitante</p>
          <Link to="#">
          <button>Clique aqui</button>
          </Link>
        </div>
      </div>

      <div className="image">
        <img src={projetos} alt="Calendario" />
        <div className="overlay">
          <p>Projetos</p>
        <Link to="/projetos">
          <button>Clique aqui</button>
          </Link>
        </div>
      </div>
    

    </div>
  </>
);

export default Inicial;
