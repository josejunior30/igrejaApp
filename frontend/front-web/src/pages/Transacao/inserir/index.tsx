import { useEffect, useState } from "react";
import "./styles.css";
import { findAllDescricaoReceita, insertTransacao } from "../../../service/TransacaoService";
import { Modal, Button } from "react-bootstrap";
import { DescricaoReceita } from "../../../models/transacao";

interface TransacaoProps {
  show: boolean;
  onHide: () => void;
}

const Transacao = ({ show, onHide }: TransacaoProps) => {
  const [descricaoReceita, setDescricaoReceita] = useState<DescricaoReceita[]>([]);
  const [selectedDescricao, setSelectedDescricao] = useState<string>(""); 
  const [valor, setValor] = useState<number | "">("");
  const [data, setData] = useState("");

  useEffect(() => {
    setData(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    async function fetchDescricaoContas() {
      try {
        const response = await findAllDescricaoReceita();
        setDescricaoReceita(response.data);
        if (response.data.length > 0) {
          setSelectedDescricao(response.data[0].descricao); 
        }
      } catch (error) {
        console.error("Erro ao buscar descrições de receitas:", error);
      }
    }
    fetchDescricaoContas();
  }, []);

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numberValue = parseFloat(rawValue) / 100;
    setValor(isNaN(numberValue) ? "" : numberValue);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const transacao = {
      descricaoReceita: { descricao: selectedDescricao }, 
      isReceita: true,
      tipoDespesa: null,
      valor: valor || 0,
      data,
    };

    try {
      await insertTransacao(transacao);
      alert("Transação adicionada com sucesso!");
      setValor("");
      setData(new Date().toISOString().split("T")[0]);
      onHide();
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
            <label className="form-label">Descrição da Receita</label>
            <select
              className="form-control"
              value={selectedDescricao}
              onChange={(e) => setSelectedDescricao(e.target.value)}
              required
            >
              {descricaoReceita.map((item, index) => (
                <option key={index} value={item.descricao}>
                  {item.descricao}
                </option>
              ))}
            </select>
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
