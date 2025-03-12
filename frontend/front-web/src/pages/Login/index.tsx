import { useContext, useEffect, useState } from "react";
import "./styles.css";

import * as authService from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import { ContextToken } from "../../ultilitarios/context-token";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";

const loadingImage = "/imagens/loading.gif";

type FormValues = {
  username: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setContextTokenPayload } = useContext(ContextToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();
  const [isMobile, setIsMobile] = useState(false);
  const loginImagem = "https://i.postimg.cc/zDy9k0jx/Ama.png";
  const logoPequeno = "https://i.postimg.cc/nL176G6s/Ama-1.png";
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    setLoading(true); // Inicia o carregamento
    authService
      .loginRequest(data)
      .then((response) => {
        authService.saveAccessToken(response.data.access_token);
        setContextTokenPayload(authService.getAccessTokenPayload());
        navigate("/inicio");
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
        setError("username", { message: "Usuário ou senha inválidos." });
      })
      .finally(() => {
        setLoading(false); // Termina o carregamento
      });
  };

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenWidth();

    const handleResize = () => {
      checkScreenWidth();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="container-fluid" id="conteiner-login">
        <div className="row" id="row-login">
          <div className="col-md-3 offset-md-2">
            <img
              src={isMobile ? logoPequeno : loginImagem}
              alt="imagem-login"
              className="img-fluid"
            />
          </div>
          <div className="col-8 col-md-3" id="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 col-11">
                <label className="form-label">Email:</label>
                <div className="input-group">
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Insira seu e-mail"
                    {...register("username", { required: true })}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label">Senha:</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Insira sua senha"
                    {...register("password", { required: true })}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    id="olho"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.username && (
                  <p className="invalid-error-message">
                    {errors.username.message}
                  </p>
                )}
                <div className="d-grid gap-2 col-9 mx-auto">
                  {loading ? (
                    <img
                      src={loadingImage}
                      alt="Carregando..."
                      className="rounded mx-auto d-block "
                      id="loading-image"
                    />
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      id="btn-logar"
                    >
                      Entrar
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
        <div className="col-md-12">
          <p className="copy">
            &copy; Segunda Igreja Batista de Pendotiba 1966-2025. Todos os
            direitos reservados
          </p>
        </div>
      </div>
      </div>
      
    </>
  );
};

export default Login;
