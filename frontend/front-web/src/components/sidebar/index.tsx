
import React, { useState } from 'react';
import { FaHome,  FaBible } from 'react-icons/fa';
import './styles.css';
import { Link } from 'react-router-dom';
import { HiUserGroup } from "react-icons/hi";
import { FaTrainSubway } from "react-icons/fa6";

const Sidebar: React.FC = () => {
        
  const [showSubmenu, setShowSubmenu] = useState(false);
const handleItemClick = () => {
setShowSubmenu(prevState => !prevState);
};
console.log('showSubmenu:', showSubmenu);
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
    <i><HiUserGroup /></i>  
      <span>Membro</span>
      </Link>
    </li>
    <li onClick={handleItemClick}>
<Link to="#">
    <FaTrainSubway />
    <span>Estação SIBAPE</span>
</Link>


{showSubmenu && (
    <ul className="submenu">
        <li><Link to="/alunos">Alunos</Link></li>
        <li><Link to="/pagamento">Pagamentos</Link></li>
        <li><Link to="/relatorio">Relatórios</Link></li>
        <li><Link to="/chamada">Lista de Presença</Link></li>
    </ul>
)}
</li>
    <li>
    <Link to="#">
    <i className="bi bi-heart-pulse-fill"></i>
      <span>Voluntario</span>
      </Link>
    </li>


    <li>
    <Link to="#">
    <FaBible />
      <span>CFC</span>
      </Link>
    </li>  
  
    <li>
    <Link to="#">
    <i className="lni lni-cog"></i>
      <span>Usuarios</span>
      </Link>
    </li>  
    <li>
    <Link to="#">
    <i className="bi bi-file-earmark-text-fill"></i>
      <span>Documentos</span>
      </Link>
    </li>  
  </ul>

</div>

    </>
  );
  
};

export default Sidebar;

