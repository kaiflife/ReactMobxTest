import React from "react";

const UserCard = ({user, openModal}) => {
    return (
        <div onClick={() => openModal(user)} className='user-card'>
            <img className='big-user-avatar mr-1' src={user.photo} alt='' />
            <div className='user-info'>
                <p className='name'>{user.name}</p>
                <p className='surname'>{user.surname}</p>
            </div>
        </div>
    )
}
export default UserCard;