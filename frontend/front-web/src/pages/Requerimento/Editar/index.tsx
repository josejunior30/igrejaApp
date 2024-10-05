import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import * as requerimentoService from '../../../service/requerimentoService';
import { Produto, requerimentoOrçamento, Status } from '../../../models/requerimentoOrçamento';
import Header from '../../../components/Header';

const RequerimentoEditar: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
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

  const [newProduto, setNewProduto] = useState<Produto>({
    id: 0,
    nome: "",
    preço: 0,
    quantidade:1
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await requerimentoService.findById(Number(id));
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
      requerimentoService.updateRequerimento(Number(id), requerimento)
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

  const handleAddProduct = () => {
    if (newProduto.nome && newProduto.preço > 0) {
      setRequerimento((prevRequerimento) => ({
        ...prevRequerimento,
        produto: [...prevRequerimento.produto, newProduto],
      }));
      setNewProduto({ id: 0, nome: "", preço: 0 , quantidade:1});
    } else {
      alert("Preencha os campos do produto corretamente!");
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
               
              />
            </div>

            
            <div className="col-4 col-md-4">
              <label htmlFor="nome" className="form-label">Produto:</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={newProduto.nome}
                onChange={(e) => setNewProduto({ ...newProduto, nome: e.target.value })}
                placeholder="Nome do produto"
               
              />
            </div>

           
            <div className="col-4 col-md-4">
              <label htmlFor="preço" className="form-label">Preço do Produto:</label>
              <input
                type="text"
                className="form-control"
                name="preço"
                value={newProduto.preço ? formatarValor(newProduto.preço.toString()) : ''}
                onChange={(e) => setNewProduto({ ...newProduto, preço: Number(e.target.value.replace(/\D/g, "")) })}
                placeholder="Preço do produto"
               
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

   
            <div className=" mt-3">
            <label htmlFor="quantidade" className="form-label mt-3">Produtos Adicionados:</label>
              <ul  className="list-group">
                {requerimento.produto && requerimento.produto.map((p: Produto, index: number) => (
                  <li key={index} className="list-group-item">
                    {p.nome} - R${p.preço.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            <label>Total: R$ {requerimento.Total}</label>
            <div className="col-4 mt-5 offset-5 ">
              <button className="btn btn-primary " type="submit">Atualizar</button>
            </div>
          </form>
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

export default RequerimentoEditar;
