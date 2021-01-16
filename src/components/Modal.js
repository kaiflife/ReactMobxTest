import React from "react";

const Modal = ({classes = '', children, closeModal, transparentModal}) => {
    const transparentModalClass = transparentModal ? 'transparent-modal' : '';
    return (
        <div className={`modal ${classes} ${transparentModalClass}`}>
            {transparentModal && <div onClick={closeModal} className='transparent' />}
            <span onClick={closeModal} className='close-modal hover-item'>x</span>
            <div className='inner-content'>
                {children}
            </div>
        </div>
    )
}
export default Modal;