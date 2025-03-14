import { Link } from "react-router-dom";
import "./styles.css";
import Header from "../../components/Header";
import *as AauthService from "../../service/AuthService"; // 🔹 Importando o serviço de autenticação

const projetos = "https://i.postimg.cc/6qJgcsZs/Esta-o-siba-250-x-150-mm-250-x-170-mm.png";
const financeiro = "https://i.postimg.cc/QdwmwPQs/financeiro.jpg";
const lideranca = "https://i.postimg.cc/T3FHVw9N/2.png";
const secretaria = "https://i.postimg.cc/TYvd9YLJ/secretaria.jpg";
const visitante = "https://i.postimg.cc/TYvd9YLJ/secretaria.jpg";
const cfc = "https://i.postimg.cc/cCW1P3MX/C-pia-de-Projeto-Final-CFC-SIBAPE.png";

const Inicial = () => {
  // Verifica se o usuário tem a role ADMIN ou FINANCA
  const temAcessoFinanceiro = AauthService.hasAnyRoles(["ROLE_ADMIN", "ROLE_FINANCA"]);

  // Função para tratar clique no botão de Finanças
  const handleFinanceiroClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!temAcessoFinanceiro) {
      e.preventDefault(); // 🔹 Impede a navegação
      alert("Acesso negado: Você não tem permissão para acessar Finanças.");
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5" id="conteiner-inicio">
        <div className="row p-2" id="bem-vindo">
          <div className="col-12">
            <h2>Bem Vindo !</h2>
            <p>Escolha uma seção!</p>
          </div>
        </div>

        <div className="row justify-content-center mt-7 " id="row-menu">
          {/* 🔹 Todos podem ver o botão, mas apenas ADMIN e FINANCA podem acessar */}
          <div className=" col-9 col-md-3" id="col-img">
            <img src={financeiro} alt="Finanças" className="img-fluid" id="img-menu" />
            <h3>Finanças</h3>
            <Link to={temAcessoFinanceiro ? "/fluxo-caixa" : "#"}>
              <button className="btn btn-info" onClick={handleFinanceiroClick}>
                Clique aqui
              </button>
            </Link>
          </div>

          <div className="col-9 col-md-3" id="col-img">
            <img src={secretaria} alt="Secretaria" className="img-fluid" id="img-menu" />
            <h3>Secretaria</h3>
            <Link to="/membro">
              <button className="btn btn-info ">Clique aqui</button>
            </Link>
          </div>
          <div className="col-9 col-md-3" id="col-img">
            <img src={lideranca} alt="Operacional" className="img-fluid" id="img-menu" />
            <h3>Operacional</h3>
            <Link to="/operacional">
              <button className="btn btn-info">Clique aqui</button>
            </Link>
          </div>
        </div>

        <div className="row justify-content-center" id="row-menu">
          <div className="col-9 col-md-3" id="col-img">
            <img src={cfc} alt="CFC" className="img-fluid" id="img-menu" />
            <h3>CFC</h3>
            <Link to="/trilho">
              <button className="btn btn-info">Clique aqui</button>
            </Link>
          </div>
          <div className="col-9 col-md-3 justify-content-center" id="col-img">
            <img src={projetos} alt="Projetos" className="img-fluid" id="img-menu" />
            <h3>Projetos</h3>
            <Link to="/projetos">
              <button className="btn btn-info">Clique aqui</button>
            </Link>
          </div>
          <div className="col-9 col-md-3" id="col-img">
            <img src={visitante} alt="Visitante" className="img-fluid" id="img-menu" />
            <h3>Visitante</h3>
            <Link to="#">
              <button className="btn btn-info">Clique aqui</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inicial;
