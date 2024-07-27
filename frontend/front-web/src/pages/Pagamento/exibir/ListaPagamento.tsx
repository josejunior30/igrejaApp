import React, { useState, useEffect } from "react";
import { AlunoPG, pagamento } from "../../../models/pagamento";
import { findByMesAtual } from "../../../service/pagamentoService"; 
import Header from "../../../components/Header";
import './styles.css';



const ListaPagamento = () => {
    const [pagamentos, setPagamentos] = useState<pagamento[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number | null>(null);
    const [totalMes, setTotalMes] = useState<number | null>(null);

    useEffect(() => {
        const fetchPagamentos = async () => {
            try {
                const response = await findByMesAtual();
                console.log('Dados dos pagamentos:', response.data); // Log dos dados recebidos
                setPagamentos(response.data); // Ajuste conforme a estrutura do seu retorno
                
                // Extrai o total e o totalMes do primeiro pagamento
                if (response.data.length > 0) {
                    setTotal(response.data[0].total || 0); // Ajuste conforme necessário
                    setTotalMes(response.data[0].totalMes || 0); // Ajuste conforme necessário
                }
            } catch (error) {
                setError("Erro ao carregar pagamentos");
            } finally {
                setLoading(false);
            }
        };
    
        fetchPagamentos();
    }, []); // O array vazio significa que o efeito será executado apenas na montagem

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
        <Header />
        <div className="container-fluid">
            <div className="row justify-content-center mt-5" >
                <div className="col-9 col-md-4 mt-5 pt-5">
                <select className="form-control">
                      <option value="">Selecione o mês</option>
                      <option value="JANEIRO">Janeiro</option>
                      <option value="FEVEREIRO">Fevereiro</option>
                      <option value="MARÇO">Março</option>
                      <option value="ABRIL">Abril</option>
                </select>
                </div>
            </div>
            
            <div className="row justify-content-center">
                <div className="col-9 col-md-8 mt-5 ">
                <h3 className="titulo-pagamento text-center mb-4">Pagamentos </h3>
                    {pagamentos.length === 0 ? (
                        <p>Nenhum pagamento encontrado.</p>
                    ) : (
                        <table className="table table-striped text-center">
                            <thead className="thead">
                                <tr>
                                    <th scope="col">Aluno</th>
                                    <th scope="col">Valor</th>
                                    <th scope="col">Forma de Pagamento</th>
                                    <th scope="col">Data de Pagamento</th>
                                    <th scope="col">Mês de Referência</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagamentos.map((pagamento) => (
                                    <tr key={pagamento.id}>
                                        <td>{pagamento.alunosPG ? pagamento.alunosPG.nome : "Não disponível"}</td>
                                        <td>{pagamento.valor}</td>
                                        <td>{pagamento.formaPagamento}</td>
                                        <td>{new Date(pagamento.dataPagamento).toLocaleDateString()}</td>
                                        <td>{pagamento.mesReferencia}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            
            <div className="row justify-content-center" id="valor" >
                <div className="col-9 col-md-4 mt-5 mb-5  offset-2" >
                    {totalMes !== null && (
                        <h3 className="valor">Total do Mês: R${totalMes}</h3>
                    )}
                </div>
                <div className="col-9 col-md-4 mt-5 mb-5">
                    {total !== null && (
                        <h3>Total Geral: R$ {total}</h3>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default ListaPagamento;
