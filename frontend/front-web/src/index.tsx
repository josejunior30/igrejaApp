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
import DetalheProjetos from './pages/Projetos/detalhe-projeto';
import Alunos from './pages/Alunos/ListaAlunos';
import AddAlunos from './pages/Alunos/addAlunos';
import DetalhesAlunos from './pages/Alunos/detalhesAlunos';
import EditarAlunos from './pages/Alunos/editarAlunos';
import Presenca from './pages/ListaChamada';
import AddLista from './pages/ListaChamada/criarLista';
import DetalhesRelatorio from './pages/Relatorio/detalhes';
import Relatorio from './pages/Relatorio/pesquisa';
import AddRelatorio from './pages/Relatorio/adicionar';
import { PrivateRoute } from './components/privateRoute';



const AppRouter = () => (
  
 
  <Router>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/inicio" element={<PrivateRoute><Inicial /></PrivateRoute>} />
    <Route path="/Pg" element={<Celulas />} />
    <Route path="/membro" element={<PrivateRoute><Membro/></PrivateRoute>} />
    <Route path="/membro/:id" element={<PrivateRoute roles={['ROLE_ADMIN']}><Detalhes /></PrivateRoute>} />
    <Route path="/membro/adicionar" element={<PrivateRoute><Formulario /></PrivateRoute>} />
    <Route path="/membro/atualizar/:id" element={<PrivateRoute><FormularioUpdate /></PrivateRoute>} />
    <Route path="/visitante" element={<Visitante />} />
    <Route path="/projetos" element={<PrivateRoute><Projetos /></PrivateRoute>} />
    <Route path="/projetos/:id" element={<PrivateRoute><DetalheProjetos /></PrivateRoute>} />
    <Route path="/alunos" element={<PrivateRoute><Alunos /></PrivateRoute>} /> 
    <Route path="/adicionarAlunos" element={<PrivateRoute><AddAlunos /></PrivateRoute>} /> 
    <Route path="/alunos/:id" element={<PrivateRoute><DetalhesAlunos /></PrivateRoute>} /> 
    <Route path="/editarAlunos/:id" element={<PrivateRoute><EditarAlunos /></PrivateRoute>} /> 
    <Route path="/chamada" element={<PrivateRoute><Presenca /></PrivateRoute>} />
    <Route path="/addlista" element={<PrivateRoute><AddLista /></PrivateRoute>} />
    <Route path="/relatorio" element={<PrivateRoute><Relatorio /></PrivateRoute>} />
    <Route path="/relatorio/:id" element={<PrivateRoute><DetalhesRelatorio /></PrivateRoute>} />
    <Route path="/enviarRelatorio" element={<PrivateRoute><AddRelatorio /></PrivateRoute>} />
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
