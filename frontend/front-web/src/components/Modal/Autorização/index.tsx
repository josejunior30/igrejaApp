import React from 'react';
import './stylesModal.css';

type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ showModal, setShowModal, children }) => {
    const closeModal = () => setShowModal(false);

    return (
        <>
            {showModal && (
                
                    
                        <span className="close" onClick={closeModal}>
                           
                            {children}
                        </span>

                 
            )}
        </>
    );
};

export default Modal;
