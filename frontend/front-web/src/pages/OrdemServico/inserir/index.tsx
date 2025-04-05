import { useState } from "react";
import {
  OrdemServico,
  Servico,
  MaterialObra,
  StatusOrdemDeServico,
  StatusServico,

} from "../../../models/ordemServico";

import "./styles.css";
import Header from "../../../components/Header";
import { insertOrdem } from "../../../service/OrdemServicoService";
import ExibirOrdem from "../exibir";

const InsertOrdem = () => {
  const [ordemServico, setOrdemServico] = useState<Omit<OrdemServico, "id">>({
    descricao: "",
    statusOrdem: StatusOrdemDeServico.PENDENTE,
    servicos: [],
  });

  const [servicos, setServicos] = useState<Servico[]>([
    {
      descricao: "",
      statusServico: StatusServico.PENDENTE,
      ordem_servico_id: 0,
      materialObra: [],
    },
  ]);
  const [selectedServicoIndex, setSelectedServicoIndex] = useState<
    number | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentServicoIndex, setCurrentServicoIndex] = useState<number | null>(
    null
  );
  const [novoMaterial, setNovoMaterial] = useState<MaterialObra>({
    nome: "",
    checkInConfirmado: false,
    servico_id: 0,
  });
  const [open, setOpen] = useState(false);
  const handleChangeOrdem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrdemServico((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleServicoField = (
    index: number,
    field: keyof Servico,
    value: any
  ) => {
    setServicos((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const adicionarServico = () => {
    setServicos((prev) => [
      ...prev,
      {
        descricao: "",
        statusServico: StatusServico.PENDENTE,
        ordem_servico_id: 0,
        materialObra: [],
      },
    ]);
  };

  const removerServico = (index: number) => {
    setServicos((prev) => prev.filter((_, i) => i !== index));
  };

  const abrirModalMaterial = (servicoIndex: number) => {
    setSelectedServicoIndex(servicoIndex);
    setCurrentServicoIndex(servicoIndex);
    setOpen(true);
  
    // Garante que ao abrir o modal, um material padrão já esteja presente
    setServicos((prev) =>
      prev.map((servico, si) =>
        si === servicoIndex && servico.materialObra.length === 0
          ? {
              ...servico,
              materialObra: [
                {
                  nome: "",
                  checkInConfirmado: false,
                  servico_id: servico.ordem_servico_id,
                },
              ],
            }
          : servico
      )
    );
  };
  const fecharModalMaterial = () => {
    setOpen(false);
    setSelectedServicoIndex(null);
    setNovoMaterial({ nome: "", checkInConfirmado: false, servico_id: 0 });
  };

  const adicionarMaterial = () => {
    if (selectedServicoIndex === null) return;

    setServicos((prev) =>
      prev.map((servico, si) =>
        si === selectedServicoIndex
          ? {
              ...servico,
              materialObra: [
                ...servico.materialObra,
                { ...novoMaterial, servico_id: servico.ordem_servico_id }, // Garante que tem um ID correto
              ],
            }
          : servico
      )
    );
    setNovoMaterial({ nome: "", checkInConfirmado: false, servico_id: 0 });
  };

  const handleSubmit = async () => {
    if (!ordemServico.descricao || !ordemServico.statusOrdem) {
      alert("Preencha a descrição e o status da ordem.");
      return;
    }

    const ordemParaSalvar: OrdemServico = {
      descricao: ordemServico.descricao,
      statusOrdem: ordemServico.statusOrdem,
      servicos,
    };

    try {
      await insertOrdem(ordemParaSalvar);
      alert("Ordem de Serviço salva com sucesso!");
      setOrdemServico({
        descricao: "",
        statusOrdem: StatusOrdemDeServico.PENDENTE,
        servicos: [],
      });
      setServicos([
        {
          descricao: "",
          statusServico: StatusServico.PENDENTE,
          ordem_servico_id: 0,
          materialObra: [],
        },
      ]);
    } catch (error) {
      console.error("Erro ao salvar ordem de serviço:", error);
      alert("Erro ao salvar ordem.");
    }
  };

  const removerMaterial = (materialIndex: number) => {
    if (selectedServicoIndex === null) return;

    setServicos((prev) =>
      prev.map((servico, si) =>
        si === selectedServicoIndex
          ? {
              ...servico,
              materialObra: servico.materialObra.filter(
                (_, mi) => mi !== materialIndex
              ),
            }
          : servico
      )
    );
  };

  const openModal = (servicoIndex: number) => {
    setSelectedServicoIndex(servicoIndex);
    setOpen(true);
  };
  const handleMaterialField = (
    materialIndex: number,
    field: keyof MaterialObra,
    value: any
  ) => {
    if (selectedServicoIndex === null) return;

    setServicos((prev) =>
      prev.map((servico, si) =>
        si === selectedServicoIndex
          ? {
              ...servico,
              materialObra: servico.materialObra.map((mat, mi) =>
                mi === materialIndex ? { ...mat, [field]: value } : mat
              ),
            }
          : servico
      )
    );
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
     
        <div className="row justify-content-center pt-3">
          <div className="col-12">
            <h5 className="titulo-ordem offset-3">Ordem de Serviço</h5>
            <div className="col-4 d-flex offset-3">
              <input
                className="form-control"
                type="text"
                name="descricao"
                placeholder="Descrição da ordem"
                value={ordemServico.descricao}
                onChange={handleChangeOrdem}
              />
            </div>
            <div className="mt-4 col-12 text-center">
                <button onClick={handleSubmit} className="btn btn-success me-3 salva-ordem">
                  Salvar Ordem
                </button>
            
            </div>
            <div className="col-4 mt-5 offset-3">
              <h5 className="titulo-ordem">Serviços</h5>
              <button onClick={adicionarServico} className="add-serviço">
                + Adicionar Serviço
              </button>
              {servicos.map((servico, servicoIndex) => (
                <div key={servicoIndex} className="servico-item mb-4">
                  <input
                    className="form-control mb-2"
                    type="text"
                    placeholder="Descrição do serviço"
                    value={servico.descricao}
                    onChange={(e) =>
                      handleServicoField(
                        servicoIndex,
                        "descricao",
                        e.target.value
                      )
                    }
                  />
                  <button
                    onClick={() => removerServico(servicoIndex)}
                    className="btn btn-outline-danger"
                  >
                    Remover Serviço
                  </button>
                  <button
                    onClick={() => abrirModalMaterial(servicoIndex)}
                    className="btn btn-outline-primary ms-2"
                  >
                    + Adicionar Material
                  </button>
                </div>
              ))}
            </div>

             
          </div>
        </div>
      </div>

      {open && selectedServicoIndex !== null && (
        <div className="modal-overlay">
          <div className="custom-modal-ordem">
            <h5>Materiais do Serviço</h5>
            {servicos[selectedServicoIndex].materialObra.map(
              (material, materialIndex) => (
                <div key={materialIndex} className="material-item mb-2">
                  <input
                    type="text"
                    className="input-material"
                    placeholder="Nome do material"
                    value={material.nome}
                    onChange={(e) =>
                      handleMaterialField(materialIndex, "nome", e.target.value)
                    }
                  />
                  <label className="ms-2">
                    <input
                      type="checkbox"
                      checked={material.checkInConfirmado}
                      onChange={(e) =>
                        handleMaterialField(
                          materialIndex,
                          "checkInConfirmado",
                          e.target.checked
                        )
                      }
                    />{" "}
                    Check-in Confirmado
                  </label>
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => removerMaterial(materialIndex)}
                  >
                    Remover
                  </button>
                </div>
              )
            )}

            <button
              onClick={adicionarMaterial}
              className="btn btn-sm btn-outline-primary mt-3"
            >
              + Adicionar Material
            </button>
            <div className="mt-3">
              <button
                onClick={fecharModalMaterial}
                className="btn btn-secondary"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
      <ExibirOrdem/>
    </>
  );
};

export default InsertOrdem;
