import { Link, useLocation } from "react-router-dom";
import "./styles.css";

const Botoes = () => {
  const location = useLocation(); // Obtém a localização atual

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
