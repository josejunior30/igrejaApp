import React, { useState, useEffect } from "react";
import { AlunoPG, FormaPagamento, MesReferencia, Pagamento } from "../../../models/pagamento";
import { findByMes, findByMesAtual, insertPagamento } from "../../../service/pagamentoService"; 
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
    const [selectedMonth, setSelectedMonth] = useState<MesReferencia | ''>('');
    const [selectedAluno, setSelectedAluno] = useState<number | ''>('');
    const [paymentValue, setPaymentValue] = useState<number | ''>('');
    const [paymentDate, setPaymentDate] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<FormaPagamento | ''>('');
    const [paymentMonth, setPaymentMonth] = useState<MesReferencia | ''>('');

    useEffect(() => {
        const fetchPagamentos = async () => {
            try {
                const response = await findByMesAtual();
                console.log('Dados dos pagamentos:', response.data);

                const pagamentosComData: Pagamento[] = response.data.map((pagamento: Pagamento) => ({
                    ...pagamento,
                    dataPagamento: new Date(pagamento.dataPagamento)
                }));

                setPagamentos(pagamentosComData);

                if (pagamentosComData.length > 0) {
                    setTotal(pagamentosComData[0].total || 0);
                    setTotalMes(pagamentosComData[0].totalMes || 0);
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

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(e.target.value as MesReferencia);
    };

    const fetchPagamentosForMonth = async () => {
        if (selectedMonth === '') return;

        try {
            const response = await findByMes(selectedMonth);

            const pagamentosComData: Pagamento[] = response.data.map((pagamento: Pagamento) => ({
                ...pagamento,
                dataPagamento: new Date(pagamento.dataPagamento)
            }));

            console.log('Pagamentos para o mês selecionado:', pagamentosComData);
            setPagamentos(pagamentosComData);
            
            if (pagamentosComData.length > 0) {
                setTotal(pagamentosComData[0].total || 0);
                setTotalMes(pagamentosComData[0].totalMes || 0);
            } else {
                setTotal(0);
                setTotalMes(0);
            }
        } catch (error) {
            console.error('Erro ao carregar pagamentos para o mês selecionado:', error);
            setError("Erro ao carregar pagamentos");
        }
    };

    const handleAddPayment = async () => {
        if (selectedAluno === '' || paymentValue === '' || paymentDate === '' || !paymentMethod || paymentMonth === '') return;

        const alunoSelecionado = alunos.find(aluno => aluno.id === Number(selectedAluno));
        if (!alunoSelecionado) {
            setError("Aluno não encontrado");
            return;
        }

        const newPayment: Pagamento = {
            id: 0, // ID será gerado pelo backend
            valor: Number(paymentValue),
            dataPagamento: new Date(paymentDate),
            totalMes: totalMes || 0,
            total: total || 0,
            formaPagamento: paymentMethod as FormaPagamento,
            mesReferencia: paymentMonth as MesReferencia,
            alunosPG: alunoSelecionado // Associando o aluno completo
            ,
            pagamento: undefined
        };

        console.log('Novo pagamento:', newPayment);

        try {
            await insertPagamento(newPayment);
            alert('Pagamento adicionado com sucesso!');
            setSelectedAluno('');
            setPaymentValue('');
            setPaymentDate('');
            setPaymentMethod('');
            setPaymentMonth('');
            fetchPagamentosForMonth();
        } catch (error) {
            console.error('Erro ao adicionar pagamento:', error);
            setError("Erro ao adicionar pagamento");
        }
    };

    const getStatus = (pagamentoDoAluno: Pagamento | undefined, currentDate: Date, month: MesReferencia) => {
        if (pagamentoDoAluno) {
            return 'PAGO';
        }

        const selectedMonthIndex = Object.values(MesReferencia).indexOf(month);
        const tenthOfSelectedMonth = new Date(currentDate.getFullYear(), selectedMonthIndex, 10);
        const twentiethOfSelectedMonth = new Date(currentDate.getFullYear(), selectedMonthIndex, 20);

        if (currentDate <= tenthOfSelectedMonth) {
            return 'EM DIA';
        } else if (currentDate > twentiethOfSelectedMonth) {
            return 'PENDENTE';
        } else {
            return 'PENDENTE';
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'PAGO':
                return 'status-pago';
            case 'EM DIA':
                return 'status-em-dia';
            case 'PENDENTE':
                return 'status-pendente';
            default:
                return 'status-default';
        }
    };

    const currentDate = new Date();

    
    return (
        <>
            <Header />
            <div className="container-fluid pt-4">
              
                <div className="row justify-content-center mt-5 pt-5">
                    <div className="col-10 col-md-9 align-items-center text-center">
                        <div className="container-white p-3">
                            <div className="row mt-3" id="inserirPG">
                                <div className="col-4">
                                    <div className="form-group">
                                        <label>Aluno</label>
                                        <select className="form-control" value={selectedAluno} onChange={(e) => setSelectedAluno(Number(e.target.value))}>
                                            <option value="" className="text-center">Selecione</option>
                                            {alunos.map(aluno => (
                                                <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label>Data de Pagamento</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={paymentDate}
                                            onChange={(e) => setPaymentDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group">
                                        <label>Valor Pago</label>
                                        <input
                                            type="number"
                                            className="form-control "
                                            value={paymentValue}
                                            onChange={(e) => setPaymentValue(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3" id="inserirPG">
                                <div className="col-4">
                                    <div className="form-group">
                                        <label>Forma de Pagamento</label>
                                        <select className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as FormaPagamento)}>
                                            <option value="" className="text-center">Selecione</option>
                                            {Object.values(FormaPagamento).map(forma => (
                                                <option key={forma} value={forma}>{forma}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label>Mês de Referência</label>
                                        <select className="form-control" value={paymentMonth} onChange={(e) => setPaymentMonth(e.target.value as MesReferencia)}>
                                            <option value="">Selecione o mês</option>
                                            {Object.values(MesReferencia).map(mes => (
                                                <option key={mes} value={mes}>{mes.charAt(0).toUpperCase() + mes.slice(1)}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-4 mt-4 pe-5">
                                    <button className="btn btn-primary" onClick={handleAddPayment}>Adicionar Pagamento</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-1">
                    <div className="col-9 col-md-4 mt-3">
                        <div className="d-flex">
                            <select className="form-control me-3" onChange={handleMonthChange} value={selectedMonth}>
                                <option value="">Selecione o mês</option>
                                {Object.values(MesReferencia).map(mes => (
                                    <option key={mes} value={mes}>{mes.charAt(0).toUpperCase() + mes.slice(1)}</option>
                                ))}
                            </select>
                            <button className="btn btn-primary ml-2" onClick={fetchPagamentosForMonth}>
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center" id="valor">
                    <div className="col-9 col-md-4 mt-5 offset-">
                        {totalMes !== null && (
                            <h3 className="valor">Total do Mês: R${totalMes}</h3>
                        )}
                    </div>
                    <div className="col-9 col-md-4 mt-5">
                        {total !== null && (
                            <h3>Todos os meses: R$ {total}</h3>
                        )}
                    </div>
                </div>
    
                <div className="row justify-content-center mt-3">
                    <div className="col-9 col-md-10">
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
                                    {alunos.map(aluno => {
                                        const pagamentoDoAluno = pagamentos.find(pagamento => pagamento.alunosPG.id === aluno.id);
                                        const status = getStatus(pagamentoDoAluno, currentDate, selectedMonth as MesReferencia);
                                        return (
                                            <tr key={aluno.id}>
                                                <td>{aluno.id}</td>
                                                <td>{aluno.nome}</td>
                                                <td className={getStatusClass(status)}>{status}</td>
                                                <td>{pagamentoDoAluno?.valor || '-'}</td>
                                                <td>{pagamentoDoAluno?.dataPagamento.toLocaleDateString() || '-'}</td>
                                                <td>{pagamentoDoAluno?.formaPagamento || '-'}</td>
                                            </tr>
                                        );
                                    })}
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
