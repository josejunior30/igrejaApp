import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../ultilitarios/system';
import './styles.css';
import { Produto, requerimentoOrçamento } from '../../../models/requerimentoOrçamento';
import Header from '../../../components/Header';

const RequerimentoOrçamento: React.FC = () => {
  const navigate = useNavigate();

  const [requerimentoOrçamento, setRequerimentoOrçamento] = useState<requerimentoOrçamento>({
    id: 0,
    dataRequerimento: new Date(),
    dataEvento: new Date(),
    dataPagamento: new Date(),
    dataAprovacao: new Date(),
    statusRequerimento: 0,
    responsavel: "",
    local: "",
    Total: 0,
    "O que vai ser feito ?": "",
    "Qual o motivo de ser feito ?": "",
    produto: [],
  });

  const [newProduto, setNewProduto] = useState<Produto & { quantidade: number }>({
    id: 0,
    nome: "",
    preço: 0,
    quantidade: 1, // Nova propriedade para quantidade
  });

  const formatarDataEvento = (data: any) => {
    const dataValida = new Date(data);
    if (!isNaN(dataValida.getTime())) {
      return dataValida.toISOString().split("T")[0];
    }
    return "";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setRequerimentoOrçamento((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduto((prevProduto) => ({
      ...prevProduto,
      [name]: name === "preço" || name === "quantidade" ? parseFloat(value) : value,
    }));
  };

  const handleAddProduct = () => {
    const produtoTotal = newProduto.preço * newProduto.quantidade; // Calcula o total do produto com base no preço e na quantidade

    setRequerimentoOrçamento((prevState) => ({
      ...prevState,
      produto: [...prevState.produto, newProduto],
      Total: prevState.Total + produtoTotal, // Atualiza o valor total
    }));

    setNewProduto({
      id: 0,
      nome: "",
      preço: 0,
      quantidade: 1, // Reseta a quantidade para o valor padrão
    });
  };

  const formatarValor = (valor: string) => {
    const valorNumerico = valor.replace(/\D/g, "");
    if (valorNumerico === "") return "0,00"; 

    const valorFormatado = (Number(valorNumerico) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return valorFormatado;
  };

  const handlePrecoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarValor(e.target.value);
    
    // Atualiza o estado com o valor formatado para exibição e com o valor numérico real para salvar no backend
    setNewProduto((prevProduto) => ({
      ...prevProduto,
      preço: parseFloat(valorFormatado.replace(/\./g, '').replace(',', '.')), // Armazena o valor numérico correto
    }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      console.log("Requerimento antes do POST:", requerimentoOrçamento);
      
      // Faz o POST do requerimento
      await axios.post(`${BASE_URL}/requerimento`, requerimentoOrçamento);
  
      // Mostra o alerta de sucesso após o envio bem-sucedido
      alert("Requerimento enviado com sucesso!");
  
      // Resetando o formulário após o envio
      setRequerimentoOrçamento({
        id: 0,
        dataRequerimento: new Date(),
        dataEvento: new Date(),
        dataPagamento: new Date(),
        dataAprovacao: new Date(),
        statusRequerimento: 0,
        responsavel: "",
        local: "",
        Total: 0,
        "O que vai ser feito ?": "",
        "Qual o motivo de ser feito ?": "",
        produto: [],
      });
    } catch (error) {
      console.error("Erro ao enviar requerimento:", error);
  
    
      alert("Erro ao enviar o requerimento. Por favor, tente novamente.");
    }
  };
  

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-4 pt-5">
        <div className="container col-md-8 col-12" id="relatorio-add">
          <form onSubmit={handleSubmit} className="row p-4 g-4">
            <h3>Relatório de Orçamento</h3>

            {/* Responsável */}
            <div className="col-md-4">
              <label htmlFor="responsavel" className="form-label">Responsável:</label>
              <input
                type="text"
                className="form-control"
                name="responsavel"
                value={requerimentoOrçamento.responsavel}
                onChange={handleChange}
                placeholder="Nome do responsável"
                required
              />
            </div>

            {/* Local */}
            <div className="col-md-4">
              <label htmlFor="local" className="form-label">Local:</label>
              <input
                type="text"
                className="form-control"
                name="local"
                value={requerimentoOrçamento.local}
                onChange={handleChange}
                placeholder="Local do evento"
                required
              />
            </div>

            {/* Data do Evento */}
            <div className="col-md-4">
              <label htmlFor="dataEvento" className="form-label">Data do Evento:</label>
              <input
                type="date"
                className="form-control"
                name="dataEvento"
                value={formatarDataEvento(requerimentoOrçamento.dataEvento)}
                onChange={handleChange}
                required
              />
            </div>

            {/* O que vai ser feito */}
            <div className="col-12">
              <label htmlFor="O que vai ser feito ?" className="form-label">O que vai ser feito?</label>
              <input
                type="text"
                className="form-control"
                name="O que vai ser feito ?"
                value={requerimentoOrçamento["O que vai ser feito ?"]}
                onChange={handleChange}
                placeholder="Descrição do que será feito"
                required
              />
            </div>

            {/* Qual o motivo de ser feito */}
            <div className="col-12">
              <label htmlFor="Qual o motivo de ser feito ?" className="form-label">Qual o motivo de ser feito?</label>
              <input
                type="text"
                className="form-control"
                name="Qual o motivo de ser feito ?"
                value={requerimentoOrçamento["Qual o motivo de ser feito ?"]}
                onChange={handleChange}
                placeholder="Motivo da ação"
                required
              />
            </div>

            {/* Formulário para adicionar produtos */}
            <div className=" col-md-4">
              <label htmlFor="nome" className="form-label">Produto:</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={newProduto.nome}
                onChange={handleProductChange}
                placeholder="Nome do produto"
              />
            </div>

            <div className=" col-5 col-md-3">
              <label htmlFor="preço" className="form-label">Preço do Produto:</label>
              <input
                type="text"
                className="form-control"
                name="preço"
                value={formatarValor(newProduto.preço.toString())} // Exibe o valor formatado no input
                onChange={handlePrecoChange} 
                placeholder="Preço do produto"
                required
              />
            </div>

            <div className=" col-3 col-md-2">
              <label htmlFor="quantidade" className="form-label">Quantidade:</label>
              <input
                type="number"
                className="form-control"
                name="quantidade"
                value={newProduto.quantidade} 
                onChange={handleProductChange} 
                placeholder="Quantidade"
                required
              />
            </div>

            <div className="col-3 col-md-3">
              <button
                type="button"
                className="btn btn-secondary mt-4" id='add-produto'
                onClick={handleAddProduct}
              >
                Adicionar
              </button>
            </div>

            {/* Lista de produtos adicionados */}
            <div className=" mt-3">
            <label htmlFor="quantidade" className="form-label mt-3">Produtos Adicionados:</label>
              <ul className="list-group">
                {requerimentoOrçamento.produto.map((prod, index) => (
                 <li className="list-group-item" aria-current="true" key={index}>
                   {prod.nome} -R$ {prod.preço.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} -  Quantidade: {prod.quantidade} -  SubTotal: R$ {(prod.preço * prod.quantidade).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                 </li>
                ))}
              </ul>
            </div>
            <label>Total: R$ {requerimentoOrçamento.Total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</label>

            <div className="d-grid gap-2 col-6 mx-auto mt-5">
              <button className="btn btn-primary" type="submit">Enviar</button>
            </div>
          </form>
        </div>

        <div className="row justify-content-center mt-5" id="btn-voltar-relatorio">
          <div className="col-12 col-md-8 text-center">
            <button className="btn btn-primary " onClick={handleGoBack}>Voltar</button>
          </div>
        </div>

        {/* Exibe o total geral de todos os produtos */}

      </div>
    </>
  );
};

export default RequerimentoOrçamento;
