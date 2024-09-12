import React, { useState } from 'react';
import { QuantidadePorCulto } from '../../../models/quantidade';
import Header from "../../../components/Header";
import './styles.css';
import { insertQuantidade } from '../../../service/quantidadePorCultoService';

const InsertQuantidade: React.FC = () => {
    const [quantidadePorCulto, setQuantidadePorCulto] = useState<QuantidadePorCulto>({
        id: 0,
        visitante: 0,
        data: new Date(),
        membro: 0,
        total: 0,
        tipoCulto: 0,
        numeroMulher: 0,
        numeroHomem: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let newValue: any = value;
        if (name === 'TipoCulto') {
            newValue = Number(value);
        } else if (['visitante', 'membro', 'numeroMulher', 'numeroHomem'].includes(name)) {
            newValue = Number(value);
        }
        console.log(`Handling change for ${name}:`, value); // Adicionado para debug
        console.log(`New value for ${name}:`, newValue); // Adicionado para debug
        setQuantidadePorCulto(prevState => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting form with values:', quantidadePorCulto); // Adicionado para debug
        alert("Adicionado com sucesso!");
        try {
            await insertQuantidade(quantidadePorCulto);
            setQuantidadePorCulto({
                id: 0,
                visitante: 0,
                data: new Date(),
                membro: 0,
                total: 0,
                tipoCulto: 0,
                numeroMulher: 0,
                numeroHomem: 0
            });
        } catch (error) {
            console.error("Erro ao adicionar valores:", error);
        }
    };

    return (
        <>
            <Header />
            <div className='container-fluid mt-5 pt-5'>
                <div className='container col-6'>
                    <form onSubmit={handleSubmit} className='row justify-content-center g-4 px-4 pb-4'>
                        <div className="col-md-12 text-center">
                            <h3 className='text-center pt-4' id='QuantidadeTitulo'>Quantidade por cultos</h3>
                        </div>
                        <div className='col-md-4 text-center offset-1' id='quantidade'>
                            <label htmlFor="data">Data:</label>
                            <input
                                type="date"
                                name="data"
                                className="form-control"
                                value={quantidadePorCulto.data.toISOString().split('T')[0]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-4 text-center offset-1' id='quantidade'>
                            <label htmlFor="TipoCulto">Tipo de Culto:</label>
                            <select
                                name="TipoCulto"
                                className="form-select"
                                value={quantidadePorCulto.tipoCulto}                                
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="0">Culto de Manhã</option>
                                <option value="1">Culto de Noite</option>
                                <option value="2">Batismo</option>
                                <option value="3">Aniversário</option>
                                <option value="4">Ordenação</option>
                            </select>
                        </div>
                        <div className='col-md-2 text-center offset-1' id='quantidade'>
                            <label>Visitantes</label>
                            <input
                                type="number"
                                name="visitante"
                                className="form-control"
                                value={quantidadePorCulto.visitante || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-2 text-center' id='quantidade'>
                            <label htmlFor="membro">Membros:</label>
                            <input
                                type="number"
                                name="membro"
                                className="form-control"
                                value={quantidadePorCulto.membro || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-md-2 text-center' id='quantidade'>
                            <label htmlFor="numeroHomem">Homens:</label>
                            <input
                                type="number"
                                name="numeroHomem"
                                className="form-control"
                                value={quantidadePorCulto.numeroHomem || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-md-2 text-center' id='quantidade'>
                            <label htmlFor="numeroMulher">Mulheres:</label>
                            <input
                                type="number"
                                name="numeroMulher"
                                className="form-control"
                                value={quantidadePorCulto.numeroMulher || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-md-12 text-center mt-4 mb-4'>
                            <button type="submit" className="btn-EnviarQuantiade mt-4">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default InsertQuantidade;




