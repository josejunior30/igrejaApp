
import { SlDocs } from "react-icons/sl";
import React from 'react';
import { FaHome, FaUser, FaUsers, FaFile, FaUsersCog, FaSmile, FaClipboardList, FaListAlt } from 'react-icons/fa';
import './styles.css';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Header';
import { IoMdDocument } from "react-icons/io";


const Sidebar: React.FC = () => {
  return (
<>

    <div className="sidebar-container">
      <ul className='sidebar'>
        <li>
          <Link to="/inicio">
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
        <IoMdDocument />
          <span>Relatorio</span>
          </Link>
        </li>
        <li>
        <Link to="/chamada">
        <FaListAlt />
          <span>Chamada</span>
          </Link>
        </li>
        <li>
        <Link to="#">
        <SlDocs />
          <span>Usuarios</span>
          </Link>
        </li>  
        <li>
        <Link to="#">
        <SlDocs />
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

