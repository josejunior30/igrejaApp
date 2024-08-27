import React, { useState, useEffect } from "react";
import { AlunoPG, FormaPagamento, MesReferencia, Pagamento, EntradaPG, projetos } from "../../../models/pagamento";
import { findByMes as findPagamentoByMes, findByMesAtual, insertPagamento, deletePagamento } from "../../../service/pagamentoService"; 
import { deleteEntradaPG, findByMes as findEntradaByMes, insertEntradaPG } from "../../../service/entradaService"; 
import Header from "../../../components/Header";
import './styles.css';
import { findAllAlunos, findByProjeto } from "../../../service/alunosService";
import { jsPDF } from "jspdf";
import { PiPrinterFill, PiTrashFill } from "react-icons/pi";
import axios from "axios";
import { BASE_URL } from "../../../ultilitarios/system";
import { Link } from "react-router-dom";


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
    const [totalEntradas, setTotalEntradas] = useState<{
        id: number; entrada: string, valor: number, formaPagamento: FormaPagamento 
}[]>([]);
    const [alunos, setAlunos] = useState<AlunoPG[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<MesReferencia | ''>('');
    const [selectedAluno, setSelectedAluno] = useState<number | ''>('');
    const [paymentValue, setPaymentValue] = useState<number | ''>('');
    const [paymentDate, setPaymentDate] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<FormaPagamento | ''>('');
    const [paymentMonth, setPaymentMonth] = useState<MesReferencia | ''>('');
    const [showInactive, setShowInactive] = useState<boolean>(false); // Exibir inativos por padrão
    const [filterPaidOnly, setFilterPaidOnly] = useState<boolean>(false);
    const [selectedProjeto, setSelectedProjeto] = useState<number | ''>(''); 
    const [entradaValue, setEntradaValue] = useState<number | ''>('');
    const [entradaDescription, setEntradaDescription] = useState<string>('');
    const [entradaPaymentMethod, setEntradaPaymentMethod] = useState<FormaPagamento | ''>('');
    const [entradaMonth, setEntradaMonth] = useState<MesReferencia | ''>('');
    const [filterPendingOnly, setFilterPendingOnly] = useState(false);
    const [filterFreeOnly, setFilterFreeOnly] = useState(false);

    useEffect(() => {
        const fetchPagamentos = async () => {
            try {
                const response = await findByMesAtual();
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

        const fetchProjetos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/projetos`);
                setProjetos(response.data);
            } catch (error) {
                console.error('Erro ao carregar projetos:', error);
            }
        };
    
        fetchPagamentos();
        fetchAlunos();
        fetchProjetos();
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
    
            
            const entradaResponse = await findEntradaByMes(selectedMonth as MesReferencia);
            const entradasComValores = entradaResponse.data.map((entrada: EntradaPG) => ({
                id: entrada.id, 
                entrada: entrada.entrada,
                valor: entrada.valor,
                formaPagamento: entrada.formaPagamento
            }));
    
            setEntradas(entradaResponse.data); // Armazena as entradas completas
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
            id: 0,
            valor: Number(paymentValue),
            dataPagamento: new Date(paymentDate),
            totalMensalidade: totalMes || 0,
            total: total || 0,
            totalPix: totalPix || 0,
            totalDinheiro: totalDinheiro || 0,
            formaPagamento: paymentMethod as FormaPagamento,
            mesReferencia: paymentMonth as MesReferencia,
            alunosPG: alunoSelecionado,

            pagamento: undefined,
            length: 0,
            map: undefined
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
            id: 0, 
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
        // Se o pagamento do aluno não é indefinido e a forma de pagamento é "GRATIS"
        if (pagamentoDoAluno) {
            if (pagamentoDoAluno.formaPagamento === 'GRATIS') {
                return 'GRATUITO';
            }
            return 'PAGO'; // Retorna "PAGO" se a forma de pagamento não for "GRATIS"
        }
    
        // Lógica existente para determinar o status com base na data
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
    
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'PAGO':
                return 'status-pago';
            case 'EM DIA':
                return 'status-em-dia';
            case 'PENDENTE':
                return 'status-pendente';
             case 'GRATUITO':
            return 'status-gratuito'; 
            default:
                return 'status-default';
        }
    };

    
    const currentDate = new Date();
    
    
    const handlePrint = () => {
        const doc = new jsPDF();
        let y = 15;
        const lineHeight = 5;
        const pageHeight = doc.internal.pageSize.height;
        let counter = 1; // Inicia o contador para numerar os alunos
    
        const addPage = () => {
            doc.addPage();
            y = 15; // Reinicia a posição `y` no topo da nova página
        };
    
        doc.setFontSize(14);
        doc.text("Relatório de Pagamentos", 80, y);
        y += lineHeight ;
    
        doc.setFontSize(10);
        doc.text(`Mês de Referência: ${selectedMonth ? selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1) : ''}`, 85, y);
        y += lineHeight + 5;
    
        y += lineHeight;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold'); 
        doc.text("Nº", 10, y);  
        doc.text("Nome", 20, y);
        doc.text("Projetos", 80, y);  // Nova coluna Projetos
        doc.text("Status", 105, y);
        doc.text("Valor", 135, y);
        doc.text("Data", 150, y);
        doc.text("Forma", 180, y);
        y += lineHeight;
    
        alunos
            .filter(aluno => showInactive || aluno.ativo) // Filtra os alunos com base na opção selecionada
            .filter(aluno => aluno.projetos.nome.toLowerCase() !== 'jiu-jtsu') // Filtra alunos de jiu-jitsu
            .map(aluno => {
                const pagamentoDoAluno = pagamentos.find(pagamento => pagamento.alunosPG.id === aluno.id);
                const status = getStatus(pagamentoDoAluno, currentDate, selectedMonth as MesReferencia);
                return { aluno, status, pagamentoDoAluno }; // Retorna o aluno junto com o status e pagamento para o próximo filtro
            })
            .filter(({ status }) => !filterPaidOnly || status === 'PAGO') // Aplica o filtro baseado no checkbox "Mostrar somente status PAGO"
            .forEach(({ aluno, status, pagamentoDoAluno }) => {
                if (y + lineHeight > pageHeight - 10) { // Verifica se precisa adicionar uma nova página
                    addPage();
                }
                doc.setFont('helvetica', aluno.ativo ? 'normal' : 'italic'); // Estiliza o texto para inativos (opcional)
                doc.text(`${counter}`, 10, y); // Usando o contador para numerar os alunos
                doc.text(`${aluno.nome}`, 20, y);
                doc.text(`${aluno.projetos.nome}`, 80, y);  // Preenche a coluna Projetos
                doc.text(`${status}`, 105, y);
                doc.text(`${pagamentoDoAluno?.valor || '-'}`, 135, y);
                doc.text(`${pagamentoDoAluno?.dataPagamento.toLocaleDateString() || '-'}`, 150, y);
                doc.text(`${pagamentoDoAluno?.formaPagamento || '-'}`, 180, y);
                y += lineHeight;
                counter++; // Incrementa o contador para o próximo aluno
            });
    
        // Adiciona uma linha tracejada após a tabela
        y += lineHeight / 2; // Adiciona um pequeno espaço antes da linha
        for (let i = 10; i < 200; i += 5) {
            doc.line(i, y, i + 2, y); // Desenha pequenas linhas para simular uma linha tracejada
        }
        y += lineHeight + 5;
    
        // Coloca totalPix e totalDinheiro na mesma linha
        doc.setFontSize(10);
        if (totalPix !== null || totalDinheiro !== null) {
            doc.setFont('helvetica', 'normal'); 
            const totalPixText = totalPix !== null ? `Pix: R$${totalPix}` : '';
            const totalDinheiroText = totalDinheiro !== null ? `Dinheiro: R$${totalDinheiro}` : '';
            doc.text(`${totalPixText}    ${totalDinheiroText}`, 10, y);
            y += lineHeight;
        }
        
        if (totalMes !== null) {
            doc.setFont('helvetica', 'bold'); 
            doc.text(`Sub-Total: R$${totalMes}`, 10, y);
            y += lineHeight;
        }
        totalEntradas.forEach((entrada) => {
            doc.setFont('helvetica', 'normal'); 
            doc.text(`${entrada.entrada} - R$${entrada.valor} (${entrada.formaPagamento})`, 10, y);
            y += lineHeight;
        });
    
        if (total !== null) {
            y += 4; 
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold'); 
            doc.textWithLink(`TOTAL RECEBIDO: R$${total}`, 10, y, { underline: true }); 
            y += lineHeight;
        }
    
        // Adiciona as linhas de assinatura
        y += 20; // Adiciona um espaço antes das linhas
    
        // Define as coordenadas para as linhas de assinatura
        const lineWidth = 70; // Largura das linhas de assinatura
        const coordX = 20; // Posição X da linha Coordenador
        const secX = 120; // Posição X da linha Secretaria
        const lineY = y;
    
        // Linha de Coordenador
        doc.setFont('helvetica', 'lighter');
        doc.setFontSize(9);
        doc.line(coordX, lineY, coordX + lineWidth, lineY);
        doc.text("Gilson Ornelas dos Santos", coordX + 10, lineY + 5);
    
        // Linha de Secretaria
        doc.setFontSize(9);
        doc.line(secX, lineY, secX + lineWidth, lineY);
        doc.text("Rhuan da Silva Tavares", secX + 15, lineY + 5);
    
        doc.save("relatorio_pagamentos.pdf");
    };
    
    
    
    const handleProjetoChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const projetoId = Number(e.target.value);
        setSelectedProjeto(projetoId);

        if (projetoId) {
            try {
                const response = await findByProjeto(projetoId); // Chama o serviço para buscar alunos por projeto
                setAlunos(response.data); // Atualiza a lista de alunos com os alunos do projeto selecionado
            } catch (error) {
                console.error('Erro ao carregar alunos por projeto:', error);
                setError("Erro ao carregar alunos por projeto");
            }
        } else {
            // Caso o projeto não esteja selecionado, você pode definir um comportamento padrão, como limpar a lista de alunos
            setAlunos([]);
        }
    };

    const handleDeletePayment = async (pagamentoId: number) => {
        if (window.confirm('Tem certeza de que deseja deletar este pagamento?')) {
            try {
                await deletePagamento(pagamentoId);
                alert('Pagamento deletado com sucesso!');
                setPagamentos(pagamentos.filter(pagamento => pagamento.id !== pagamentoId)); // Atualiza a lista de pagamentos
            } catch (error) {
                console.error('Erro ao deletar pagamento:', error);
                alert('Erro ao deletar pagamento.');
            }
        }
    };
    
   
    const handleDeleteEntrada = async (entradaId: number) => {
        if (window.confirm('Tem certeza de que deseja deletar esta entrada?')) {
            try {
                await deleteEntradaPG(entradaId);
                alert('Entrada deletada com sucesso!');
                setEntradas(entradas.filter(entrada => entrada.id !== entradaId)); // Atualiza a lista de entradas
                fetchPagamentosForMonth(); // Atualiza a lista de pagamentos e entradas
            } catch (error) {
                console.error('Erro ao deletar entrada:', error);
                alert('Erro ao deletar entrada.');
            }
        }
    };
    const getFormaPagamentoClass = (formaPagamento: string) => {
        if (formaPagamento === 'GRATIS') {
            return 'forma-pagamento-gratuito'; // Classe para GRATUITO
        }
        return '';
    };
    
    return (
        <>
            <Header />
            <div className="container-fluid pt-4">
              
                <div className="row justify-content-center mt-5 pt-5">
                    <div className="col-10 col-md-9 align-items-center text-center">
                        <div className="container-white p-3">
                            <div className="row mt-3" id="inserirPG">
                            <div className="col-2">
                        <div className="form-group">
                            <label className="pagamento">Projeto</label>
                            <select
                                className="form-control"
                                value={selectedProjeto}
                                onChange={handleProjetoChange}
                            >
                                <option value="">Selecione</option>
                                {projetos.map((projeto) => (
                                    <option key={projeto.id} value={projeto.id}>
                                        {projeto.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="pagamento">Aluno</label>
                         <select className="form-control" value={selectedAluno} onChange={(e) => setSelectedAluno(Number(e.target.value))}>
                            <option value="" className="text-center">Selecione</option>
                            {alunos
                                .sort((a, b) => a.nome.localeCompare(b.nome)) 
                                .map(aluno => (
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

    <div className="col-9 col-md-11 mt-3">
        {totalPix !== null && (
            <h3 className="valor">Pix: R${totalPix}</h3>
        )}
    </div>
    <div className="col-9 col-md-11 ">
        {totalDinheiro !== null && (
            <h3 className="valor">Dinheiro: R${totalDinheiro}</h3>
        )}
    </div>
    <div className="col-9 col-md-11 ">
        {totalMes !== null && (
            <h3 className="sub-total">Sub-Total: R${totalMes}</h3>
        )}
    </div>

    
    <div className="col-9 col-md-11 ">
    {totalEntradas.length > 0 && totalEntradas.map((entrada, index) => (
    <h3 
        key={index} 
        className="valor" 
        style={{ cursor: 'pointer', color: 'white' }} 
        onClick={() => handleDeleteEntrada(entrada.id)}
    >
        {entrada.entrada} - R${entrada.valor} ({entrada.formaPagamento})
    </h3>
))}

</div>


    <div className="col-9 col-md-11 d-flex align-items-center justify-content-between">
        {total !== null && (
            <h2 className="totalMes">TOTAL RECEBIDO: R${total}</h2>
        )}
        <button onClick={handlePrint} className="mr-2" id="print-pagamnto"><PiPrinterFill /> Imprimir</button>
        <div className="d-flex align-items-center">
    <div className="form-check">
        <input 
            className="form-check-input" 
            type="checkbox" 
            id="showInactive" 
            checked={showInactive} 
            onChange={() => setShowInactive(!showInactive)} 
        />
        <label className="form-inativos" htmlFor="showInactive">
             Alunos inativos
        </label>
    </div>
    <div className="form-check ms-4">
    <input
        className="form-check-input"
        type="checkbox"
        id="filterPaidOnly"
        checked={filterPaidOnly}
        onChange={() => {
            if (filterPendingOnly) {
                setFilterPendingOnly(false);
            }
            setFilterPaidOnly(!filterPaidOnly);
        }}
    />
    <label className="form-inativos" htmlFor="filterPaidOnly">
        PAGO
    </label>
</div>


<div className="form-check ms-4">
    <input
        className="form-check-input"
        type="checkbox"
        id="filterPendingOnly"
        checked={filterPendingOnly}
        onChange={() => {
            if (filterPaidOnly) {
                setFilterPaidOnly(false);
            }
            setFilterPendingOnly(!filterPendingOnly);
        }}
    />
    <label className="form-inativos" htmlFor ="filterPendingOnly">
        PENDENTE
    </label>
</div>
<div className="form-check ms-4">
    <input
        className="form-check-input"
        type="checkbox"
        id="filterFreeOnly"
        checked={filterFreeOnly}
        onChange={() => {
            if (filterPendingOnly) {
                setFilterPendingOnly(false);
            }else if(filterPaidOnly){
                setFilterPaidOnly(false);
            }
            setFilterFreeOnly(!filterFreeOnly);
        }}
    />
    <label className="form-inativos" htmlFor="filterFreeOnly">
        GRATUITO
    </label>
</div>

</div>


    </div>
</div>

<div className="row justify-content-center mt-3">
    <div className="col-9 col-md-11 ">
        {alunos.length === 0 ? (
            <p>Nenhum aluno encontrado.</p>
        ) : (
            <table className="table table-striped text-center">
                <thead className="thead">
                    <tr>
                        <th scope="col">#</th> 
                        <th scope="col">Nome</th>
                        <th scope="col">Projeto</th>
                        <th scope="col">Status</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Data de Pagamento</th>
                        <th scope="col">Forma</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
    {alunos
        .filter(aluno => showInactive || aluno.ativo) 
        .filter(aluno => aluno.projetos.nome.toLowerCase() !== 'jiu-jtsu') 
        .map(aluno => {
            const pagamentoDoAluno = pagamentos.find(pagamento => pagamento.alunosPG.id === aluno.id);
            const status = getStatus(pagamentoDoAluno, currentDate, selectedMonth as MesReferencia);
            return { aluno, status, pagamentoDoAluno }; 
        })
        .filter(({ status }) => {
            if (filterPaidOnly) return status === 'PAGO';
            if (filterPendingOnly) return status === 'PENDENTE';
            if (filterFreeOnly) return status === 'GRATUITO'; 
            return true;
        })
        .map(({ aluno, status, pagamentoDoAluno }, index) => {
            const rowClass = aluno.ativo ? '' : 'inativo'; 
            const formaPagamentoClass = getFormaPagamentoClass(pagamentoDoAluno?.formaPagamento || '');

            return (
                <tr key={aluno.id} className={rowClass}>
                    <td>{index + 1}</td>
                    <td> <Link to={`historicoPagamento/${aluno.id}`} className="name-link">{aluno.nome} </Link></td>
                    <td>{aluno.projetos.nome || '-'}</td>
                    <td className={getStatusClass(status)}>{status}</td>
                    <td>{pagamentoDoAluno?.valor || '-'}</td>
                    <td>{pagamentoDoAluno?.dataPagamento.toLocaleDateString() || '-'}</td>
                    <td className={formaPagamentoClass}>{pagamentoDoAluno?.formaPagamento || '-'}</td>
                    <td>
                        <button onClick={() => handleDeletePayment(pagamentoDoAluno?.id || 0)} className="custom-btn">
                            <PiTrashFill />
                        </button>
                    </td>
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
