import React from "react";

const Teste:React.FC = () => {

  return (
    <>
    <body>
    <div>
    <h1 id="titulo">Cadastro de DEVs</h1>
    <p id="subtitulo">Complete suas informações</p>
  </div>
      <form  >
        <fieldset className="grupo">
          <div className="campo">
            <label htmlFor="nome"><strong>Nome</strong></label>
            <input type="text" name="nome" id="nome" required />
          </div>
          <div className="campo">
            <label htmlFor="sobrenome"><strong>Sobrenome</strong></label>
            <input type="text" name="sobrenome" id="sobrenome" required />
          </div>
        </fieldset>
        <br />
        <div className="campo">
          <label htmlFor="email"><strong>Email</strong></label>
          <input type="email" name="email" id="email" required />
        </div>
        <br />
        <div className="campo">
          <label><strong>De qual lado da aplicação você desenvolve?</strong></label>
          <label>
            <input type="radio" name="devweb" value="frontend" defaultChecked />Front-end
          </label>
          <label>
            <input type="radio" name="devweb" value="backend" />Back-end
          </label>
          <label>
            <input type="radio" name="devweb" value="fullstack" />Fullstack
          </label>
        </div>
        <br />
        <div className="campo">
          <label htmlFor="senioridade"><strong>Senioridade</strong></label>
          <select id="senioridade">
            <option disabled defaultValue="">Selecione</option>
            <option>Junior</option>
            <option>Pleno</option>
            <option>Senior</option>
          </select>
        </div>
  
        <div className="campo">
          <br />
          <label><strong>Conte um pouco da sua experiência:</strong></label>
          <textarea style={{ width: "26em" }} id="experiencia" name="experiencia"></textarea>
        </div>
        <button className="botao" type="submit">Concluir</button>
    </form>
    </body>
    </>

  );
};
export default Teste ;