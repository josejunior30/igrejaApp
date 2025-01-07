import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { PrivateRoute } from "./components/privateRoute";
import Celulas from "./pages/Celulas";
import Membro from "./pages/Membro";
import Detalhes from "./pages/Membro/detalhe-membro";
import Formulario from "./pages/formMembro/adcionarMembro";
import Inicial from "./pages/Inicial";
import FormularioUpdate from "./pages/formMembro/EditarMembro";
import Visitante from "./pages/Visitante";
import Projetos from "./pages/Projetos";
import DetalheProjetos from "./pages/Projetos/detalhe-projeto";
import Alunos from "./pages/Alunos/ListaAlunos";
import AddAlunos from "./pages/Alunos/addAlunos";
import DetalhesAlunos from "./pages/Alunos/detalhesAlunos";
import EditarAlunos from "./pages/Alunos/editarAlunos";
import Presenca from "./pages/ListaChamada";

import Relatorio from "./pages/Relatorio/pesquisa";
import DetalhesRelatorio from "./pages/Relatorio/detalhes";
import AddRelatorio from "./pages/Relatorio/adicionar";
import { AccessTokenPayloadDTO } from "./models/auth";
import { ContextToken } from "./ultilitarios/context-token";
import * as authService from "./service/AuthService";
import ChangePassword from "./pages/Usuario/Redefinir";
import PresencaBox from "./pages/ListaChamada/checkbox";
import ListaPagamento from "./pages/Pagamento/exibir/ListaPagamento";
import AlunoPagamentos from "./pages/Pagamento/historicoPG";
import Dashboard from "./pages/Dashbord/Alunos";
import InsertQuantidade from "./pages/QuantidadeCulto/Inserir";
import NumeroCulto from "./pages/QuantidadeCulto/exibir";
import RequerimentoOrçamento from "./pages/Requerimento/Inserir";
import RequerimentoExibir from "./pages/Requerimento/Exibir";
import RequerimentoEditar from "./pages/Requerimento/Editar";
import OperacionalMenu from "./pages/menuOperacional";
import RequerimentoAprovar from "./pages/Requerimento/Aprovar";
import Trilha from "./pages/Cfc";
import TrilhaId from "./pages/Cfc/trilha";
import MenuOpcao from "./pages/Cfc/menuAlunos";
import Inscrever from "./pages/Cfc/Inscrever";
import InserirPresencaEBD from "./pages/Cfc/ListaPresenca/Inserir";
import HistoricoChamadaEBD from "./pages/Cfc/ListaPresenca/Exibir";
import Estudo from "./pages/Cfc/Estudo";
import ExibirPdfs from "./pages/Cfc/Estudo/exibir";

function App() {
  const [contextTokenPayload, setContextTokenPayload] =
    useState<AccessTokenPayloadDTO>();
  useEffect(() => {
    if (authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
    }
  }, []);

  return (
    <ContextToken.Provider
      value={{ contextTokenPayload, setContextTokenPayload }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/inicio"
            element={
              <PrivateRoute>
                <Inicial />
              </PrivateRoute>
            }
          />
          <Route path="/Pg" element={<Celulas />} />
          <Route
            path="/membro"
            element={
              <PrivateRoute>
                <Membro />
              </PrivateRoute>
            }
          />
          <Route
            path="/membro/:id"
            element={
              <PrivateRoute roles={["ROLE_ADMIN"]}>
                <Detalhes />
              </PrivateRoute>
            }
          />
          <Route
            path="/membro/adicionar"
            element={
              <PrivateRoute roles={["ROLE_ADMIN"]}>
                <Formulario />
              </PrivateRoute>
            }
          />
          <Route
            path="/membro/atualizar/:id"
            element={
              <PrivateRoute roles={["ROLE_ADMIN"]}>
                <FormularioUpdate />
              </PrivateRoute>
            }
          />
          <Route path="/visitante" element={<Visitante />} />
          <Route
            path="/projetos"
            element={
              <PrivateRoute>
                <Projetos />
              </PrivateRoute>
            }
          />
          <Route
            path="/projetos/:id"
            element={
              <PrivateRoute>
                <DetalheProjetos />
              </PrivateRoute>
            }
          />
          <Route
            path="/alunos"
            element={
              <PrivateRoute>
                <Alunos />
              </PrivateRoute>
            }
          />
          <Route
            path="/adicionarAlunos"
            element={
              <PrivateRoute>
                <AddAlunos />
              </PrivateRoute>
            }
          />
          <Route
            path="/alunos/:id"
            element={
              <PrivateRoute>
                <DetalhesAlunos />
              </PrivateRoute>
            }
          />
          <Route
            path="/editarAlunos/:id"
            element={
              <PrivateRoute>
                <EditarAlunos />
              </PrivateRoute>
            }
          />
          <Route
            path="/chamada"
            element={
              <PrivateRoute>
                <Presenca />
              </PrivateRoute>
            }
          />
          <Route
            path="/quantidade"
            element={
              <PrivateRoute>
                <InsertQuantidade />
              </PrivateRoute>
            }
          />
          <Route
            path="/relatorio"
            element={
              <PrivateRoute>
                <Relatorio />
              </PrivateRoute>
            }
          />
          <Route
            path="/relatorio/:id"
            element={
              <PrivateRoute>
                <DetalhesRelatorio />
              </PrivateRoute>
            }
          />
          <Route
            path="/enviarRelatorio"
            element={
              <PrivateRoute>
                <AddRelatorio />
              </PrivateRoute>
            }
          />
          <Route path="/redefinirsenha" element={<ChangePassword />} />
          <Route path="/enviarChamada/:id" element={<PresencaBox />} />
          <Route
            path="/pagamento"
            element={
              <PrivateRoute>
                <ListaPagamento />
              </PrivateRoute>
            }
          />
          <Route
            path="pagamento/historicoPagamento/:id"
            element={
              <PrivateRoute>
                <AlunoPagamentos />
              </PrivateRoute>
            }
          />
          <Route path="/dashbord" element={<Dashboard />} />
          <Route path="/requerimento" element={<RequerimentoExibir />} />
          <Route
            path="/requerimentoEditar/:id"
            element={<RequerimentoEditar />}
          />
          <Route
            path="/requerimento/inserir"
            element={<RequerimentoOrçamento />}
          />
          <Route path="/operacional" element={<OperacionalMenu />} />
          <Route
            path="/requerimentoAprovar/:id"
            element={<RequerimentoAprovar />}
          />
          <Route
            path="/numeroculto"
            element={
              <PrivateRoute>
                <NumeroCulto />
              </PrivateRoute>
            }
          />
          <Route path="/trilho" element={<Trilha />} />
          <Route path="/trilho/:id" element={<TrilhaId />} />
          <Route path="trilho/opcao/:id" element={<MenuOpcao />} />
          <Route path="trilho/inscrever/:id" element={<Inscrever />} />
          <Route
            path="trilho/presenca/inserir/:id"
            element={
              <PrivateRoute>
                <InserirPresencaEBD />
              </PrivateRoute>
            }
          />
          <Route
            path="trilho/presenca/historicoChamada"
            element={
              <PrivateRoute>
                <HistoricoChamadaEBD />
              </PrivateRoute>
            }
          />

          <Route path="trilho/estudo" element={<Estudo />} />
          <Route path="trilho/estudo/exibir" element={<ExibirPdfs />} />
        </Routes>
      </Router>
    </ContextToken.Provider>
  );
}
export default App;
