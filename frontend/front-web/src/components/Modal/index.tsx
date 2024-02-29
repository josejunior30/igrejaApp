// SuccessModal.tsx
import React from "react";
import './styles.css';
import { GiConfirmed } from "react-icons/gi";
import { CgDanger } from "react-icons/cg";
interface SuccessModalProps {
  onClose: () => void;
  operation: "adicionar" | "atualizar" | "deletar";
  onRedirect: () => void
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose, operation,  onRedirect  }) => {
  const getMensagem = () => {
    switch (operation) {
      case "adicionar":
        return "Membro adicionado com sucesso!";
      case "atualizar":
        return "Membro atualizado com sucesso!";
      case "deletar":
        return "Membro deletado com sucesso!";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="modal">
        <span className="icone-confirma">
          <GiConfirmed />
        </span>
        <p className="msg">{getMensagem()}</p>
        <button onClick={onClose} className="btn-confirma">Fechar</button>
      </div>
    </>
  );
};

export default SuccessModal;
