import { useEffect, useState } from "react";
import "./styles.css";
import { insertTransacao } from "../../../service/TransacaoService";
import { Modal, Button } from "react-bootstrap";

interface TransacaoProps {
  show: boolean;
  onHide: () => void;
}

const Transacao = ({ show, onHide }: TransacaoProps) => {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number | "">("");
  const [data, setData] = useState("");

  useEffect(() => {
    setData(new Date().toISOString().split("T")[0]); // Define data como hoje
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
      isReceita: true, // Sempre será uma receita (ganho)
      tipoDespesa: null,
      valor: valor || 0,
      data,
    };

    try {
      await insertTransacao(transacao);
      alert("Transação adicionada com sucesso!");
      setDescricao("");
      setValor("");
      setData(new Date().toISOString().split("T")[0]);
      onHide(); // Fecha o modal após a inserção
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      alert("Erro ao adicionar transação.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Inserir Ganho</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="formulario-transacao" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Descrição</label>
            <input
              type="text"
              className="form-control"
              value={descricao}
              placeholder="Insira a descrição"
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Data</label>
            <input
              type="date"
              className="form-control"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Valor</label>
            <input
              type="text"
              className="form-control"
              value={valor === "" ? "" : valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              onChange={handleValorChange}
              placeholder="R$ 0,00"
              required
            />
          </div>

          <div className="text-end">
            <Button variant="secondary" onClick={onHide}>
              Fechar
            </Button>
            <Button type="submit" variant="primary" className="ms-2">
              Inserir
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Transacao;
