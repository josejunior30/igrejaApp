

import React from 'react';
import { FaHome, FaUser, FaUsers, FaFile, FaUsersCog, FaSmile } from 'react-icons/fa';
import './styles.css';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Header';



const Sidebar: React.FC = () => {
  return (
<>

    <div className="sidebar-container">
      <ul className='sidebar'>
        <li>
          <Link to="/">
            <FaHome />
            <span>Home</span>
            </Link>
        </li>
        <li>
        <Link to="/membro">
          <FaUsers />
          <span>Membro</span>
          </Link>
        </li>
       
        <li>
        <Link to="/visitante">
          <FaUsers />
          <span>Visitante</span>
          </Link>
        </li>
        <li>
        <Link to="/alunos">
          <FaUsersCog />
          <span>Alunos</span>
          </Link>
        </li>
        <li>
        <Link to="/relatorio">
        <FaSmile />
          <span>Relatorio</span>
          </Link>
        </li>
        <li>
        <Link to="/chamada">
        <FaSmile />
          <span>Chamada</span>
          </Link>
        </li>
        <li>
        <Link to="#">
          <FaFile />
          <span>Documentos</span>
          </Link>
        </li>  
      </ul>
    
    </div>
   
    <Outlet/>
    </>
  );
  
};

export default Sidebar;

