import React from "react";

const UserCard = ({user, openModal}) => {
    return (
        <div onClick={() => openModal(user)} className='user-card'>
            <img className='big-user-avatar mr-1' src={user.avatar} alt='' />
            <div className='user-info'>
                <p className='name'>{user.first_name}</p>
                <p className='surname'>{user.last_name}</p>
            </div>
        </div>
    )
}
export default UserCard;