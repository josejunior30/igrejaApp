import React, { useState } from "react";
import { FaHome, FaBible,  FaCalendarAlt } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { GiHammerNails } from "react-icons/gi";

import "./styles.css";
import { FaTrainSubway } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
const Sidebar: React.FC = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  
  const handleItemClick = () => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <div className="sidebar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/inicio" className="nav-link">
            <FaHome className="me-2" /> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/membro" className="nav-link">
            <HiUserGroup className="me-2" /> Membro
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/visitante" className="nav-link">
            <HiUserGroup className="me-2" /> Visitante
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/kids" className="nav-link">
            <FontAwesomeIcon icon={faChildReaching} className="me-2" /> Kids
          </Link>
        </li>
        <li className="nav-item">
          <button className="nav-link bg-transparent border-0" onClick={handleItemClick}>
            <FaTrainSubway className="me-2" /> Estação SIBAPE
          </button>
          {showSubmenu && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <Link to="/alunos" className="nav-link">Alunos</Link>
              </li>
              <li className="nav-item">
                <Link to="/pagamento" className="nav-link">Pagamentos</Link>
              </li>
              <li className="nav-item">
                <Link to="/relatorio" className="nav-link">Relatórios</Link>
              </li>
              <li className="nav-item">
                <Link to="/chamada" className="nav-link">Lista de Presença</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <Link to="/calendario" className="nav-link">
            <FaCalendarAlt className="me-2" /> Calendário
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/gabinete" className="nav-link">
          <FaBible /> Gabinete
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/ordem-servico" className="nav-link">
          <GiHammerNails />Obras/Reparos

          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
