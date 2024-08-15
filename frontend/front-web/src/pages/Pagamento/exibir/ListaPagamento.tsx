import React, { useState, useEffect } from "react";
import { AlunoPG, FormaPagamento, MesReferencia, Pagamento, EntradaPG, projetos } from "../../../models/pagamento";
import { findByMes as findPagamentoByMes, findByMesAtual, insertPagamento } from "../../../service/pagamentoService"; 
import { findByMes as findEntradaByMes, insertEntradaPG } from "../../../service/entradaService"; 
import Header from "../../../components/Header";
import './styles.css';
import { findAllAlunos } from "../../../service/alunosService";
import { jsPDF } from "jspdf";
import { PiPrinterFill } from "react-icons/pi";


const ListaPagamento: React.FC = () => {
    const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
    const [entradas, setEntradas] = useState<EntradaPG[]>([]);
    const [projetos, setProjetos] = useState<projetos[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number | null>(null);
    const [totalPix, setTotalPix] = useState<number | null>(null);
    const [totalDinheiro, setTotalDinheiro] = useState<number | null>(null);
    const [totalMes, setTotalMes] = useState<number | null>(null);
    const [totalEntradas, setTotalEntradas] = useState<{ entrada: string, valor: number, formaPagamento: FormaPagamento }[]>([]);
    const [alunos, setAlunos] = useState<AlunoPG[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<MesReferencia | ''>('');
    const [selectedAluno, setSelectedAluno] = useState<number | ''>('');
    const [paymentValue, setPaymentValue] = useState<number | ''>('');
    const [paymentDate, setPaymentDate] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<FormaPagamento | ''>('');
    const [paymentMonth, setPaymentMonth] = useState<MesReferencia | ''>('');
    const [showInactive, setShowInactive] = useState<boolean>(false); // Exibir inativos por padrão
    
    // States for EntradaPG form
    const [entradaValue, setEntradaValue] = useState<number | ''>('');
    const [entradaDescription, setEntradaDescription] = useState<string>('');
    const [entradaPaymentMethod, setEntradaPaymentMethod] = useState<FormaPagamento | ''>('');
    const [entradaMonth, setEntradaMonth] = useState<MesReferencia | ''>('');

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
                    setTotalMes(pagamentosComData[0].totalMensalidade || 0);
                    setTotalPix(pagamentosComData[0].totalPix || 0);
                    setTotalDinheiro(pagamentosComData[0].totalDinheiro || 0);
                }
            } catch (error) {
                setError("Erro ao carregar pagamentos");
            } finally {
                setLoading(false);
            }
        };
    
        const fetchAlunos = async () => {
            try {
                const response = await findAllAlunos();
                setAlunos(response.data);
            } catch (error) {
                console.error('Erro ao carregar alunos:', error);
            }
        };
    
        fetchPagamentos();
        fetchAlunos();
        // Remover fetchEntradas() daqui
    }, []);
    

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(e.target.value as MesReferencia);
    };

    const fetchPagamentosForMonth = async () => {
        if (selectedMonth === '') return;
    
        try {
            const response = await findPagamentoByMes(selectedMonth as MesReferencia);
    
            const pagamentosComData: Pagamento[] = response.data.map((pagamento: Pagamento) => ({
                ...pagamento,
                dataPagamento: new Date(pagamento.dataPagamento)
            }));
    
            console.log('Pagamentos para o mês selecionado:', pagamentosComData);
            setPagamentos(pagamentosComData);
    
            if (pagamentosComData.length > 0) {
                setTotalMes(pagamentosComData[0].totalMensalidade || 0);
                setTotalPix(pagamentosComData[0].totalPix || 0);
                setTotalDinheiro(pagamentosComData[0].totalDinheiro || 0);
            } else {
                setTotalMes(0);
                setTotalPix(0);
                setTotalDinheiro(0);
            }
    
            // Fetch entradas for the selected month only after clicking "Buscar"
            const entradaResponse = await findEntradaByMes(selectedMonth as MesReferencia);
            setEntradas(entradaResponse.data);
    
            const entradasComValores = entradaResponse.data.map((entrada: EntradaPG) => ({
                entrada: entrada.entrada,
                valor: entrada.valor,
                formaPagamento: entrada.formaPagamento
            }));
    
            setTotalEntradas(entradasComValores);
    
            // Calcular o total de entradas
            const totalEntradas = entradasComValores.reduce((acc: any, entrada: { valor: any; }) => acc + entrada.valor, 0);
    
            // Atualiza o total com a soma de totalMensalidade e total de entradas
            const novoTotal = (pagamentosComData[0]?.totalMensalidade || 0) + totalEntradas;
            setTotal(novoTotal);
    
        } catch (error) {
            console.error('Erro ao carregar pagamentos e entradas para o mês selecionado:', error);
            setError("Erro ao carregar pagamentos e entradas");
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
            totalMensalidade: totalMes || 0,
            total: total || 0,
            totalPix: totalPix || 0,
            totalDinheiro: totalDinheiro || 0,
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

    const handleAddEntrada = async () => {
        if (entradaValue === '' || entradaDescription === '' || !entradaPaymentMethod || entradaMonth === '') return;

        const newEntrada: EntradaPG = {
            id: 0, // ID será gerado pelo backend
            valor: Number(entradaValue),
            entrada: entradaDescription,
            formaPagamento: entradaPaymentMethod as FormaPagamento,
            mesReferencia: entradaMonth as MesReferencia,
        };

        console.log('Nova entrada:', newEntrada);

        try {
            await insertEntradaPG(newEntrada);
            alert('Entrada adicionada com sucesso!');
            setEntradaValue('');
            setEntradaDescription('');
            setEntradaPaymentMethod('');
            setEntradaMonth('');
            fetchPagamentosForMonth();
        } catch (error) {
            console.error('Erro ao adicionar entrada:', error);
            setError("Erro ao adicionar entrada");
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

    const handlePrint = () => {
        const doc = new jsPDF();
        let y = 15;
    
        doc.setFontSize(18);
        doc.text("Relatório de Pagamentos", 65, y);
        y += 10;
    
        doc.setFontSize(14);
        doc.text(`Mês de Referência: ${selectedMonth ? selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1) : ''}`, 70, y);
        y += 15;
    
        doc.setFontSize(12);
        if (totalPix !== null) {
            doc.setFont('helvetica', 'normal'); 
            doc.text(`Pix: R$${totalPix}`, 10, y);
            y += 7;
        }
        if (totalDinheiro !== null) {
            doc.setFont('helvetica', 'normal'); 
            doc.text(`Dinheiro: R$${totalDinheiro}`, 10, y);
            y += 7;
        }
        if (totalMes !== null) {
            doc.setFont('helvetica', 'bold'); 
            doc.text(`Sub-Total: R$${totalMes}`, 10, y);
            y += 7;
        }
        totalEntradas.forEach((entrada) => {
            doc.setFont('helvetica', 'normal'); 
            doc.text(`${entrada.entrada} - R$${entrada.valor} (${entrada.formaPagamento})`, 10, y);
            y += 7;
        });
    
        if (total !== null) {
            y += 4; 
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold'); 
            doc.textWithLink(`TOTAL RECEBIDO: R$${total}`, 10, y, { underline: true }); 
            y += 6;
        }
    
        y += 10;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold'); 
        doc.text("ID", 10, y);
        doc.text("Nome", 20, y);
        doc.text("Status", 85, y);
        doc.text("Valor", 115, y);
        doc.text("Data", 140, y);
        doc.text("Forma", 180, y);
        y += 10;
    
        alunos
            .filter(aluno => showInactive || aluno.ativo) // Filtra os alunos com base na opção selecionada
            .forEach(aluno => {
                const pagamentoDoAluno = pagamentos.find(pagamento => pagamento.alunosPG.id === aluno.id);
                const status = getStatus(pagamentoDoAluno, currentDate, selectedMonth as MesReferencia);
    
                doc.setFont('helvetica', aluno.ativo ? 'normal' : 'italic'); // Estiliza o texto para inativos (opcional)
                doc.text(`${aluno.id}`, 10, y);
                doc.text(`${aluno.nome}`, 20, y);
                doc.text(`${status}`, 85, y);
                doc.text(`${pagamentoDoAluno?.valor || '-'}`, 115, y);
                doc.text(`${pagamentoDoAluno?.dataPagamento.toLocaleDateString() || '-'}`, 140, y);
                doc.text(`${pagamentoDoAluno?.formaPagamento || '-'}`, 180, y);
                y += 10;
            });
    
        doc.save("relatorio_pagamentos.pdf");
    };
    
    
    
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
                                        <label className="pagamento">Aluno</label>
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
                                        <label className="pagamento">Data de Pagamento</label>
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
                                        <label className="pagamento">Valor Pago</label>
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
                                        <label className="pagamento">Forma de Pagamento</label>
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
                                        <label className="pagamento">Mês de Referência</label>
                                        <select className="form-control" value={paymentMonth} onChange={(e) => setPaymentMonth(e.target.value as MesReferencia)}>
                                            <option value="">Selecione o mês</option>
                                            {Object.values(MesReferencia).map(mes => (
                                                <option key={mes} value={mes}>{mes.charAt(0).toUpperCase() + mes.slice(1)}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-5 mt-4 pe-5">
                                    <button className="btn btn-primary" onClick={handleAddPayment}>Adicionar Pagamento</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-5 pt-5">
                    <div className="col-10 col-md-8 align-items-center text-center">
                        <div className="container-white p-3">
                            <div className="row mt-3" id="inserirPG">
                                <div className="col-5">
                                    <div className="form-group">
                                        <label className="entrada">Descrição da Entrada</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={entradaDescription}
                                            onChange={(e) => setEntradaDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="form-group">
                                        <label className="entrada">Valor</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={entradaValue}
                                            onChange={(e) => setEntradaValue(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="entrada">Forma de Pagamento</label>
                                        <select className="form-control" value={entradaPaymentMethod} onChange={(e) => setEntradaPaymentMethod(e.target.value as FormaPagamento)}>
                                            <option value="" className="text-center">Selecione</option>
                                            {Object.values(FormaPagamento).map(forma => (
                                                <option key={forma} value={forma}>{forma}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="entrada">Mês de Referência</label>
                                        <select className="form-control" value={entradaMonth} onChange={(e) => setEntradaMonth(e.target.value as MesReferencia)}>
                                            <option value="">Selecione o mês</option>
                                            {Object.values(MesReferencia).map(mes => (
                                                <option key={mes} value={mes}>{mes.charAt(0).toUpperCase() + mes.slice(1)}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-5 mt-4 pe-5">
                                    <button className="btn btn-primary" onClick={handleAddEntrada}>Adicionar Entrada</button>
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

    <div className="col-9 col-md-9 mt-3">
        {totalPix !== null && (
            <h3 className="valor">Pix: R${totalPix}</h3>
        )}
    </div>
    <div className="col-9 col-md-9 ">
        {totalDinheiro !== null && (
            <h3 className="valor">Dinheiro: R${totalDinheiro}</h3>
        )}
    </div>
    <div className="col-9 col-md-9 ">
        {totalMes !== null && (
            <h3 className="sub-total">Sub-Total: R${totalMes}</h3>
        )}
    </div>

    {/* Exibindo as entradas junto com os outros dados financeiros apenas após buscar */}
    <div className="col-9 col-md-9 ">
        {totalEntradas.length > 0 && totalEntradas.map((entrada, index) => (
            <h3 key={index} className="valor">{entrada.entrada} - R${entrada.valor} ({entrada.formaPagamento})</h3>
        ))}
    </div>

    <div className="col-9 col-md-9 d-flex align-items-center justify-content-between">
        {total !== null && (
            <h2 className="totalMes">TOTAL RECEBIDO: R${total}</h2>
        )}
        <button onClick={handlePrint} className="mr-2" id="print-pagamnto"><PiPrinterFill /> Imprimir</button>
 <div className="form-check">
    <input 
        className="form-check-input" 
        type="checkbox" 
        id="showInactive" 
        checked={showInactive} 
        onChange={() => setShowInactive(!showInactive)} 
    />
    <label className="form-inativos" htmlFor="showInactive">
        Mostrar alunos inativos
    </label>
</div>
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
                        <th scope="col">#</th> {/* Altere o cabeçalho de ID para # ou Numeração */}
                        <th scope="col">Nome</th>
                        <th scope="col">Projeto</th> {/* Nova coluna para Projetos */}
                        <th scope="col">Status</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Data de Pagamento</th>
                        <th scope="col">Forma de Pagamento</th>
                    </tr>
                </thead>
                <tbody>
    {alunos
        .filter(aluno => showInactive || aluno.ativo) // Filtra a lista de acordo com o estado `showInactive`
        .filter(aluno => aluno.projetos.nome.toLowerCase() !== 'jiu-jtsu') // Filtra alunos de jiu-jitsu
        .map((aluno, index) => {
            const pagamentoDoAluno = pagamentos.find(pagamento => pagamento.alunosPG.id === aluno.id);
            const status = getStatus(pagamentoDoAluno, currentDate, selectedMonth as MesReferencia);
            const rowClass = aluno.ativo ? '' : 'inativo'; // Adiciona a classe 'inativo' se o aluno não for ativo

            return (
                <tr key={aluno.id} className={rowClass}> {/* Aplica a classe à linha */}
                    <td>{index + 1}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.projetos.nome || '-'}</td> {/* Exibe o nome do projeto */}
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
