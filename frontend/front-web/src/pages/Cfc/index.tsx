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
const suporte =
  "https://i.postimg.cc/CM2S1527/C-pia-de-Projeto-Final-CFC-SIBAPE-Story.png";
const Trilha = () => {
  const navigator = useNavigate();
  const handleGoBack = () => {
    navigator("/inicio");
  };
  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5  " id="conteiner-inicio">
        <div className="row p-2 mt-4" id="bem-vindo"></div>
        <div className="container d-flex  justify-content-center">
          <div className="row justify-content-center   mb-4" id="linha-menu">
            <h3>
              Trilhos entre <span className="idade-trilho"> 0 a 17 anos </span>
            </h3>

            <div className="col-9 col-md-3" id="container-img">
              <Link to="/trilho/opcao/5">
                <img
                  src={crianca}
                  alt="crianca"
                  className="img-fluid imagem-trilho"
                  id="img-menu"
                />
              </Link>
            </div>
            <div
              className="col-7 col-md-2 justify-content-center"
              id="container-img"
            >
              <Link to="/trilho/opcao/7">
                <img
                  src={Adolescentes}
                  alt="Adolescente"
                  className="img-fluid"
                  id="img-menu"
                />
              </Link>
            </div>
          </div>

          <div className="row justify-content-center " id="linha-menu">
            <h3>
              Trilhos entre <span className="idade-trilho"> 18 a 65 anos</span>
            </h3>
            <div className=" col-9 col-md-3" id="container-img">
              <Link to="/trilho/opcao/3">
                <img
                  src={VidaCrista}
                  alt="Vida Crista"
                  className="img-fluid"
                  id="img-menu"
                />
              </Link>
            </div>
            <div className="col-9 col-md-3" id="container-img">
              <Link to="/trilho/opcao/2">
                <img
                  src={BibliaTeologia}
                  alt="Biblia"
                  className="img-fluid"
                  id="img-menu"
                />
              </Link>
            </div>
            <div className="col-9 col-md-3" id="container-img">
              <Link to="/trilho/opcao/8">
                <img
                  src={suporte}
                  alt="suporte"
                  className="img-fluid"
                  id="img-menu"
                />
              </Link>
            </div>
            <div className="col-9 col-md-3" id="container-img">
              <Link to="/trilho/opcao/1">
                <img
                  src={Fundamentos}
                  alt="Fundamentos"
                  className="img-fluid"
                  id="img-menu"
                />
              </Link>
            </div>
          </div>

          <div className="row justify-content-center" id="linha-menu">
            <h3>
              Trilhos mais de <span className="idade-trilho"> 65 anos</span>
            </h3>
            <div className="col-9 col-md-3" id="container-img">
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
