// SuccessModal.tsx
import React from "react";
import './styles.css';
import { GiConfirmed } from "react-icons/gi";

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  return (
    <>
    <div className="modal">
     <span className="icone-confirma">
      <GiConfirmed />
     </span> 
        <p className="msg">Membro adicionado com sucesso!</p>
        <button onClick={onClose}  className="btn-confirma">Fechar</button>
    </div>
   
    </>
  );
};

export default SuccessModal;
