import React from "react";

const UserCard = ({user, openModal}) => {
    return (
        <div onClick={() => openModal(user)} className='user-card'>
            <img src={user.photo} alt='' />
            <p className='name'>{user.name}</p>
            <p className='surname'>{user.surname}</p>
        </div>
    )
}
export default UserCard;