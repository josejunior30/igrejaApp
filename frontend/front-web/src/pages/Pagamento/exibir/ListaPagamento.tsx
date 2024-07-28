import React, { useState, useEffect } from "react";
import { AlunoPG, MesReferencia, Pagamento } from "../../../models/pagamento";
import { findByMesAtual } from "../../../service/pagamentoService"; 
import Header from "../../../components/Header";
import './styles.css';
import { findAll } from "../../../service/alunosService";

const ListaPagamento: React.FC = () => {
    const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number | null>(null);
    const [totalMes, setTotalMes] = useState<number | null>(null);
    const [alunos, setAlunos] = useState<AlunoPG[]>([]);

    useEffect(() => {
        const fetchPagamentos = async () => {
            try {
                const response = await findByMesAtual();
                console.log('Dados dos pagamentos:', response.data);
                setPagamentos(response.data);

                if (response.data.length > 0) {
                    setTotal(response.data[0].total || 0);
                    setTotalMes(response.data[0].totalMes || 0);
                }
            } catch (error) {
                setError("Erro ao carregar pagamentos");
            } finally {
                setLoading(false);
            }
        };

        const fetchAlunos = async () => {
            try {
                const response = await findAll();
                setAlunos(response.data);
            } catch (error) {
                console.error('Erro ao carregar alunos:', error);
            }
        };

        fetchPagamentos();
        fetchAlunos();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    const getStatusClass = (status: string) => {
        return status === 'Pendente' ? 'status-pendente' : 'status-default';
    };

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row justify-content-center mt-5">
                    <div className="col-9 col-md-4 mt-5 pt-5">
                        <select className="form-control">
                            <option value="">Selecione o mês</option>
                            {Object.values(MesReferencia).map(mes => (
                                <option key={mes} value={mes}>{mes.charAt(0).toUpperCase() + mes.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="row justify-content-center" id="valor">
                    <div className="col-9 col-md-4 mt-5 offset-">
                        {totalMes !== null && (
                            <h3 className="valor">Total do Mês: R${totalMes}</h3>
                        )}
                    </div>
                    <div className="col-9 col-md-4 mt-5 ">
                        {total !== null && (
                            <h3>Todos os meses: R$ {total}</h3>
                        )}
                    </div>
                </div>

                <div className="row justify-content-center mt-3">
                    <div className="col-9 col-md-10 ">
                        {alunos.length === 0 ? (
                            <p>Nenhum aluno encontrado.</p>
                        ) : (
                            <table className="table table-striped text-center">
                                <thead className="thead">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Valor</th>
                                        <th scope="col">Data de Pagamento</th>
                                        <th scope="col">Forma de Pagamento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alunos.map(aluno => (
                                        aluno.pagamentos.length > 0 ? (
                                            aluno.pagamentos.map((pagamento: { id: React.Key | null | undefined; valor: any; dataPagamento: string | number | Date; formaPagamento: any; }) => (
                                                <tr key={pagamento.id}>
                                                    <td>{aluno.id}</td>
                                                    <td>{aluno.nome}</td>
                                                    <td>{aluno.statusPagamento}</td>
                                                    <td>{pagamento.valor || '---'}</td>
                                                    <td>{pagamento.dataPagamento ? new Date(pagamento.dataPagamento).toLocaleDateString() : '---'}</td>
                                                    <td>{pagamento.formaPagamento || '---'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr key={aluno.id}>
                                                <td>{aluno.id}</td>
                                                <td>{aluno.nome}</td>
                                                <td className={getStatusClass(aluno.statusPagamento)}>{aluno.statusPagamento}</td>
                                                <td>---</td>
                                                <td>---</td>
                                                <td>---</td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListaPagamento;
