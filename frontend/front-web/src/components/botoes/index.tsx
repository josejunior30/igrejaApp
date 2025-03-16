import { Link, useLocation } from "react-router-dom";

import *as AuthService from "../../service/AuthService"; 
import "./styles.css";

const Botoes = () => {
  const location = useLocation();


  // Verifica se o usuário tem a role necessária
  const hasPermission = AuthService.hasAnyRoles(["ROLE_ADMIN", "ROLE_FINANCA"]);

  // Se não tiver permissão, não renderiza nada
  if (!hasPermission) {
    return null;
  }

  return (
    <div className="col-10 text-center pt-5">
      <Link to="/requerimento">
        <button
          className={`menu-transferencia ${location.pathname === "/requerimento" ? "ativo" : ""}`}
        >
          Pedido de Compra
        </button>
      </Link>

      <Link to="/transacao-exibir">
        <button
          className={`menu-transferencia ${location.pathname === "/transacao-exibir" ? "ativo" : ""}`}
        >
          Ganhos
        </button>
      </Link>

      <Link to="/fluxo-caixa">
        <button
          className={`menu-transferencia ${location.pathname === "/fluxo-caixa" ? "ativo" : ""}`}
        >
          Fluxo de Caixa
        </button>
      </Link>

      <Link to="/conta-pagar">
        <button
          className={`menu-transferencia ${location.pathname === "/conta-pagar" ? "ativo" : ""}`}
        >
          Contas a Pagar
        </button>
      </Link>
    </div>
  );
};

export default Botoes;
