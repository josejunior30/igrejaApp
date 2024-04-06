import React from 'react';
import './styles.css';

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
                
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                           
                            {children}
                        </span>
                      
                    </div>
                   
                  
            )}
        </>
    );
};

export default Modal;
