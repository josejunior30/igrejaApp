import { useNavigate, useParams } from "react-router-dom";
import { Produto, requerimentoOrçamento, Status } from "../../../models/requerimentoOrçamento";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { findById, updateRequerimento } from "../../../service/requerimentoService";
import Header from "../../../components/Header";
import './styles.css';

const RequerimentoAprovar: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isEditable, setIsEditable] = useState(false);
  
  const [requerimento, setRequerimento] = useState<requerimentoOrçamento>({
    id: 0,
    dataRequerimento: new Date(),
    dataEvento: new Date(),
    dataPagamento: new Date(),
    dataAprovacao: new Date(),
    statusRequerimento: Status.PENDENTE,
    responsavel: "",
    local: "",
    Total: 0,
    "O que vai ser feito ?": "",
    "Qual o motivo de ser feito ?": "",
    produto: [],
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await findById(Number(id));
          setRequerimento(response.data || {});
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes do requerimento:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdateClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id && requerimento) {
      updateRequerimento(Number(id), requerimento)
        .then(response => {
          console.log("Requerimento atualizado com sucesso:", response.data);
          alert("Atualização feita com sucesso!");  
          navigate('/requerimento');  
        })
        .catch(error => {
          console.error("Erro ao atualizar requerimento:", error);
          alert("Erro ao atualizar requerimento. Tente novamente."); 
        });
    }
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRequerimento(prevRequerimento => ({
      ...prevRequerimento,
      [name]: name === 'dataEvento'
        ? new Date(value)
        : name === 'statusRequerimento'
          ? Number(value)
          : value,
    }));
  };


  const handleGoBack = () => {
    navigate(-1);
  };


  return (
    <>
      <Header />
      <div className="container-fluid mt-4 pt-5">
        <div className="container col-md-8 col-12" id="relatorio-add">
          <form onSubmit={handleUpdateClick} className="row p-4 g-4">
            <h3>Relatório de Orçamento</h3>

            <div className="col-4 col-md-4">
              <label htmlFor="responsavel" className="form-label">Responsável:</label>
              <input
                type="text"
                className="form-control"
                name="responsavel"
                value={requerimento.responsavel}
                onChange={handleChange}
                placeholder="Nome do responsável"
                required
                disabled={!isEditable}
              />
            </div>

            <div className="col-4 col-md-4">
              <label htmlFor="local" className="form-label">Local:</label>
              <input
                type="text"
                className="form-control"
                name="local"
                value={requerimento.local}
                onChange={handleChange}
                placeholder="Local do evento"
                required
                disabled={!isEditable}
              />
            </div>

            <div className="col-4 col-md-4">
              <label htmlFor="dataEvento" className="form-label">Data do Evento:</label>
              <input
                type="date"
                className="form-control"
                name="dataEvento"
                value={requerimento.dataEvento instanceof Date ? requerimento.dataEvento.toISOString().split('T')[0] : ''}
                onChange={(e) => setRequerimento({ ...requerimento, dataEvento: new Date(e.target.value) })}
                disabled={!isEditable}
              />
            </div>

            <div className="col-12">
              <label htmlFor="O que vai ser feito ?" className="form-label">O que vai ser feito?</label>
              <input
                type="text"
                className="form-control"
                name="O que vai ser feito ?"
                value={requerimento["O que vai ser feito ?"]}
                onChange={handleChange}
                placeholder="Descrição do que será feito"
                required
                disabled={!isEditable}
              />
            </div>

            <div className="col-12">
              <label htmlFor="Qual o motivo de ser feito ?" className="form-label">Qual o motivo de ser feito?</label>
              <input
                type="text"
                className="form-control"
                name="Qual o motivo de ser feito ?"
                value={requerimento["Qual o motivo de ser feito ?"]}
                onChange={handleChange}
                placeholder="Motivo da ação"
                required
                disabled={!isEditable}
              />
            </div>

            <div className="col-12 mt-6 ">
              <h5  >Produtos adicionados:</h5>
              <ul>
                {requerimento.produto.map((p: Produto, index: number) => (
                  <li key={index}>
                    {p.nome} - R${p.preço.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>

            
            <div className="col-4 col-md-4 mb-3">
              <label htmlFor="Total" className="form-label">Total:</label>
              <input
                type="text"
                className="form-control"
                name="Total"
                value={requerimento.Total} 
                disabled
              />
            </div>
          </form>
        </div>

        <div className="row justify-content-center text-center mt-5" id="label-apro">
          <div className="col-12 col-md-2">
            <label htmlFor="dataAprovacao" className="form-label">Data Aprovação:</label>
            <input
              type="date"
              className="form-control"
              name="dataAprovacao"
              value={requerimento.dataAprovacao instanceof Date ? requerimento.dataAprovacao.toISOString().split('T')[0] : ''}
              onChange={(e) => setRequerimento({ ...requerimento, dataAprovacao: new Date(e.target.value) })}
              disabled={!isEditable}
            />
          </div>

          <div className="col-12 col-md-2">
            <label htmlFor="dataPagamento" className="form-label">Data Pagamento:</label>
            <input
              type="date"
              className="form-control"
              name="dataPagamento"
              value={requerimento.dataPagamento instanceof Date ? requerimento.dataPagamento.toISOString().split('T')[0] : ''}
              onChange={(e) => setRequerimento({ ...requerimento, dataPagamento: new Date(e.target.value) })}
              disabled={!isEditable}
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="statusRequerimento" className="form-label">Status:</label>
            <select
              className="form-select"
              name="statusRequerimento"
              value={requerimento.statusRequerimento}
              onChange={handleChange}
              disabled={!isEditable}
            >
              <option value={Status.PENDENTE}>Pendente</option>
              <option value={Status.RECUSADO}>Recusado</option>
              <option value={Status.APROVADO}>Aprovado</option>
            </select>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-4 offset-3 mt-4">
            <button className="btn btn-primary" onClick={() => setIsEditable(!isEditable)}>
              {isEditable ? 'Salvar' : 'Aprovar'}
            </button>
          </div>
        </div>

        <div className="row justify-content-center mt-5" id="btn-voltar-relatorio">
          <div className="col-12 col-md-8 d-flex justify-content-between">
            <button className="btn btn-outline-secondary" onClick={handleGoBack}>Voltar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequerimentoAprovar;
