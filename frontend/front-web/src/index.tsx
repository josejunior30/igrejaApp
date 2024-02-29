import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Membro from './pages/Membro';
import Celulas from './pages/Celulas';
import App from './App';
import Charts from './pages/Charts/Charts';
import Inicial from './pages/Inicial';
import Sidebar from './components/sidebar';
import Visitante from './pages/Visitante';
import Detalhes from './pages/Membro/detalhe-membro';
import Formulario from './pages/formMembro/adcionarMembro';

import Projetos from './pages/Projetos';
import Teste from './pages/formMembro/teste';
import FormularioUpdate from './pages/formMembro/EditarMembro';


const AppRouter = () => (
  
 
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/inicio" element={<Inicial />} />
            <Route path="/Pg" element={<Celulas />} />
            <Route path="/secretaria/*" element={<Sidebar />}>
              <Route path="membro" element={<Membro />} />
              <Route path="visitante" element={<Visitante />} />
              <Route path="membro/:id" element={<Detalhes/>} />
              <Route path="membro/adicionar" element={<Formulario />} />
              <Route path="membro/atualizar/:id" element={<FormularioUpdate />} />
            </Route>  
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/teste" element={<Teste />}/>
          </Routes>
      </Router>

);

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
     
    <AppRouter />
    
    <App />
  </React.StrictMode>,
  root
);
