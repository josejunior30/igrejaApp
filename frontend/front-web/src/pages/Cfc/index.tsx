import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import "./styles.css";

const VidaCrista = "https://i.postimg.cc/CK5rVy33/4-20241110-150138-0003.png";
const BibliaTeologia =
  "https://i.postimg.cc/7Y4BZTvM/5-20241110-150139-0004.png";

const Fundamentos = "https://i.postimg.cc/pLGkCGmq/6-20241110-150139-0005.png";
const PalavaVida = "https://i.postimg.cc/G2YQcbq5/1-20241110-150138-0000.png";
const Adolescentes = "https://i.postimg.cc/m2TwsfMm/2-20241110-150138-0001.png";
const crianca = "https://i.postimg.cc/Cx1sRGcD/3-20241110-150138-0002.png";
const gtprojetos =
  "https://i.postimg.cc/sgpZ72vd/C-pia-de-Projeto-Final-CFC-SIBAPE-20250105-140604-0001.png";
const capacitacao =
  "https://i.postimg.cc/G2bPHyQ5/C-pia-de-Projeto-Final-CFC-SIBAPE-20250105-140604-0000.png";
const Trilha = () => {
  const navigator = useNavigate();
  const handleGoBack = () => {
    navigator("/inicio");
  };
  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5  " id="conteiner-inicio">
        <div className="row mb-2 text-center  titulo-trilho  mt-5 mb-4">
          <h3 className="col-7 col-md-5 idade-trilho-h3">
            Trilhos entre <span className="idade-trilho"> 0 a 17 anos </span>
          </h3>
          <h3 className="col-7 col-md-3 offset-1  ">
            Trilhos tematicos /<span className="idade-trilho"> Adultos</span>
          </h3>
        </div>
        <div className="container  justify-content-center">
          <div className="row  mb-2 justify-content-center linha-menu">
            <div className="col-7 col-md-1" id="container-img">
              <Link to="/trilho/opcao/5">
                <img
                  src={crianca}
                  alt="crianca"
                  className="img-fluid imagem-trilho"
                  id="img-menu"
                />
              </Link>
            </div>
            <div className="col-7 col-md-1 " id="container-img">
              <Link to="/trilho/opcao/7">
                <img
                  src={Adolescentes}
                  alt="Adolescente"
                  className="img-fluid"
                  id="img-menu"
                />
              </Link>
            </div>

            <div className=" col-7 col-md-2 offset-2" id="container-img">
              <Link to="/trilho/opcao/3">
                <img
                  src={VidaCrista}
                  alt="Vida Crista"
                  className="img-fluid"
                  id="img-menu"
                />
              </Link>
            </div>
            <div className="col-7 col-md-2" id="container-img">
              <Link to="/trilho/opcao/2">
                <img
                  src={BibliaTeologia}
                  alt="Biblia"
                  className="img-fluid"
                  id="img-menu"
                />
              </Link>
            </div>
            <div className="col-7 col-md-2" id="container-img">
              <Link to="/trilho/opcao/1">
                <img
                  src={Fundamentos}
                  alt="Fundamentos"
                  className="img-fluid"
                  id="img-menu"
                />
              </Link>
            </div>
            <div className="col-7 col-md-2" id="container-img">
              <Link to="/trilho/opcao/6">
                <img
                  src={PalavaVida}
                  alt="Palava e vida"
                  className="img-fluid"
                  id="img-menu"
                />
              </Link>
            </div>
          </div>

          <div className="row mb-2   titulo-trilho text-center mt-5 mb-4">
            <div className="col-7 col-md-12 text-center">
              <h3>
                {" "}
                Modulos de
                <span className="idade-trilho"> Capacitaçao e Suporte</span>
              </h3>
            </div>
          </div>
          <div className="row  linha-menu justify-content-center">
            <div className="col-7 col-md-3" id="container-img-modulo">
              <Link to="/trilho/opcao/8">
                <img
                  src={gtprojetos}
                  alt="suporte"
                  className="img-fluid"
                  id="img-menu"
                />
              </Link>
            </div>
            <div className="col-7 col-md-3" id="container-img-modulo">
              <Link to="/trilho/opcao/4">
                <img
                  src={capacitacao}
                  alt="suporte"
                  className="img-fluid"
                  id="img-menu"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-12 text-center mt-4">
            <button className="btn btn-primary" onClick={handleGoBack}>
              Voltar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Trilha;
