import React from "react";

const ModalUserCard = ({user, closeModal}) => {
    return (
        <div className='user-card'>
            <p onClick={closeModal} className='close-modal'>x</p>
            <img src={user.photo} alt='' />
            <p className='name'>{user.name}</p>
            <p className='surname'>{user.surname}</p>
        </div>
    )
}
export default ModalUserCard;