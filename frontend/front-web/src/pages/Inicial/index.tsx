import { Link } from "react-router-dom";
import "./styles.css";
import Header from "../../components/Header";
import * as AuthService from "../../service/AuthService"; // 🔹 Importando o serviço de autenticação

const projetos =
  "https://i.postimg.cc/6qJgcsZs/Esta-o-siba-250-x-150-mm-250-x-170-mm.png";
const financeiro = "https://i.postimg.cc/QdwmwPQs/financeiro.jpg";
const lideranca = "https://i.postimg.cc/T3FHVw9N/2.png";
const secretaria = "https://i.postimg.cc/TYvd9YLJ/secretaria.jpg";
const visitante = "https://i.postimg.cc/TYvd9YLJ/secretaria.jpg";
const cfc =
  "https://i.postimg.cc/cCW1P3MX/C-pia-de-Projeto-Final-CFC-SIBAPE.png";

const Inicial = () => {
  // Verifica se o usuário tem a role ADMIN ou FINANCA
  const temAcessoFinanceiro = AuthService.hasAnyRoles([
    "ROLE_ADMIN",
    "ROLE_FINANCA",
  ]);


const handleFinanceiroClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

        <div className="row justify-content-center  ">
          <div className=" col-12 col-md-3 container-menu">
            <Link to={temAcessoFinanceiro ? "/fluxo-caixa" : "#"} onClick={handleFinanceiroClick}>
              <img
                src={financeiro}
                alt="Finanças"
                className="img-fluid img-menu"
              />
              <div className="title-overlay">
                <h3>Finanças</h3>
              </div>
            </Link>
          </div>

          <div className="col-12 col-md-3 container-menu">
            <Link to="/membro">
              <img
                src={secretaria}
                alt="Secretaria"
                className="img-fluid img-menu"
              />
              <h3>Secretaria</h3>
            </Link>
          </div>

          <div className="col-12 col-md-3 container-menu">
            <Link to="/operacional">
              <img
                src={lideranca}
                alt="Operacional"
                className="img-fluid img-menu"
              />
              <h3>Operacional</h3>
            </Link>
          </div>
        </div>

        <div className="row justify-content-center mt-3">
          <div className="col-12 col-md-3 container-menu">
            <Link to="/trilho">
              <img src={cfc} alt="CFC" className="img-fluid img-menu" />
              <h3>CFC</h3>
            </Link>
          </div>

          <div className="col-12 col-md-3 container-menu">
            <Link to="/projetos">
              <img
                src={projetos}
                alt="Projetos"
                className="img-fluid img-menu"
              />
              <h3>Projetos</h3>
            </Link>
          </div>

          <div className="col-12 col-md-3 container-menu">
            <Link to="/visitante">
              <img
                src={visitante}
                alt="Visitante"
                className="img-fluid img-menu"
              />
              <h3>Visitante</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inicial;
