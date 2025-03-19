import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../components/Header";
import * as AuthService from "../../service/AuthService"; 

const projetos = "https://i.postimg.cc/6qJgcsZs/Esta-o-siba-250-x-150-mm-250-x-170-mm.png";
const financeiro = "https://i.postimg.cc/QdwmwPQs/financeiro.jpg";
const lideranca = "https://i.postimg.cc/T3FHVw9N/2.png";
const secretaria = "https://i.postimg.cc/TYvd9YLJ/secretaria.jpg";
const visitante = "https://i.postimg.cc/TYvd9YLJ/secretaria.jpg";
const cfc = "https://i.postimg.cc/cCW1P3MX/C-pia-de-Projeto-Final-CFC-SIBAPE.png";

const Inicial = () => {
  const temAcessoFinanceiro = AuthService.hasAnyRoles(["ROLE_ADMIN", "ROLE_FINANCA"]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [clicks, setClicks] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Função para lidar com duplo clique
  const handleDoubleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (!isMobile) return; // Apenas para dispositivos móveis

    if (!clicks[link]) {
      e.preventDefault(); // Impede a navegação no primeiro clique
      setClicks((prev) => ({ ...prev, [link]: 1 }));

      setTimeout(() => {
        setClicks((prev) => {
          const newClicks = { ...prev };
          delete newClicks[link]; // Reseta os cliques após 1 segundo
          return newClicks;
        });
      }, 1000);
    }
  };
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

        <div className="row justify-content-center">
          <div className="col-12 col-md-3 container-menu">
            <Link 
              to={temAcessoFinanceiro ? "/fluxo-caixa" : "#"}
              onClick={(e) => {
                handleDoubleClick(e, "/fluxo-caixa");
                handleFinanceiroClick(e);
              }}
      
            >
              <img src={financeiro} alt="Finanças" className="img-fluid img-menu" />
              <h3>Finanças</h3>
            </Link>
          </div>

          <div className="col-12 col-md-3 container-menu">
            <Link to="/membro" onClick={(e) => handleDoubleClick(e, "/membro")}>
              <img src={secretaria} alt="Secretaria" className="img-fluid img-menu" />
              <h3>Secretaria</h3>
            </Link>
          </div>

          <div className="col-12 col-md-3 container-menu">
            <Link to="/operacional" onClick={(e) => handleDoubleClick(e, "/operacional")}>
              <img src={lideranca} alt="Operacional" className="img-fluid img-menu" />
              <h3>Operacional</h3>
            </Link>
          </div>
        </div>

        <div className="row justify-content-center mt-3">
          <div className="col-12 col-md-3 container-menu">
            <Link to="/trilho" onClick={(e) => handleDoubleClick(e, "/trilho")}>
              <img src={cfc} alt="CFC" className="img-fluid img-menu" />
              <h3>CFC</h3>
            </Link>
          </div>

          <div className="col-12 col-md-3 container-menu">
            <Link to="/projetos" onClick={(e) => handleDoubleClick(e, "/projetos")}>
              <img src={projetos} alt="Projetos" className="img-fluid img-menu" />
              <h3>Projetos</h3>
            </Link>
          </div>

          <div className="col-12 col-md-3 container-menu">
            <Link to="/visitante" onClick={(e) => handleDoubleClick(e, "/visitante")}>
              <img src={visitante} alt="Visitante" className="img-fluid img-menu" />
              <h3>Visitante</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inicial;
