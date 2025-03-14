import { useEffect, useState } from "react";
import "./styles.css";
import Header from "../../../components/Header";
import { insertTransacao } from "../../../service/TransacaoService";

import Botoes from "../../../components/botoes";

const Transacao = () => {
  const [descricao, setDescricao] = useState("");
  const [isReceita, setIsReceita] = useState("");
  const [tipoDespesa, setTipoDespesa] = useState("");
  const [valor, setValor] = useState<number | "">("");
  const [data, setData] = useState("");

  const formatCurrency = (value: number | "") => {
    if (value === "") return "";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  useEffect(() => {
    const hoje = new Date().toISOString().split("T")[0];
    setData(hoje);
  }, []);

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ""); 
    const numberValue = parseFloat(rawValue) / 100; 
    setValor(isNaN(numberValue) ? "" : numberValue);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const transacao = {
      descricao,
      isReceita: true, // Agora sempre será TRUE
      tipoDespesa: null, 
      valor: valor || 0, 
      data,
    };
  
    try {
      await insertTransacao(transacao);
      alert("Transação adicionada com sucesso!");
  
      setDescricao("");
      setValor("");
      setData("");
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      alert("Erro ao adicionar transação.");
    }
  };
  

  return (
    <>
      <Header />
      <div className="container-fluid  ">
        <div className="row  justify-content-center">
   <Botoes/>
          <div className="col-6 text-center mb-5">
            <h3 className="titulo-transferencia">Ganhos</h3>
            <form
              className="row justify-content-center formulario-transacao"
              onSubmit={handleSubmit}
            >
              <div className="col-5">
                <label className="form-label">Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  value={descricao}
                  placeholder="insira a descrição"
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>

              <div className="col-3">
                <label className="form-label">Data</label>
                <input
                  type="date"
                  className="form-control"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>

              <div className="col-3">
                <label className="form-label">Valor</label>
                <input
                  type="text"
                  className="form-control"
                  value={formatCurrency(valor)}
                  onChange={handleValorChange}
                  placeholder="R$ 0,00"
                />
              </div>

              <div className="col-md-1 pt-2 ">
                <button type="submit" className="btn btn-primary mt-4 ">
                  Inserir
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Transacao;
