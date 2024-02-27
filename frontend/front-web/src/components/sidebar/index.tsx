// Sidebar.tsx
// Sidebar.js

import React from 'react';
import { FaHome, FaUser, FaUsers, FaFile, FaUsersCog, FaSmile } from 'react-icons/fa';
import './styles.css';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Header';



const Sidebar: React.FC = () => {
  return (
<>
<Header/>
    <div className="sidebar-container">
      <ul className='sidebar'>
        <li>
        <Link to="/inicio">
          <FaHome />
          <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="membro">
          <FaUser />
          <span>Membro</span>
          </Link>
        </li>
        <li>
        <Link to="visitante">
          <FaUsers />
          <span>Visitante</span>
          </Link>
        </li>
        <li>
        <Link to="#">
          <FaUsersCog />
          <span>Líderes</span>
          </Link>
        </li>
        <li>
        <Link to="#">
        <FaSmile />
          <span>Kids</span>
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

