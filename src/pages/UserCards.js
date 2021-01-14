import React, {useState} from "react";
import UserCard from "../components/UserCard";
import ModalUserCard from "../components/ModalUserCard";
import Pagination from "../components/Pagination";
import {inject} from "mobx-react";

const UsersCards = (users) => {
    const [isOpenedCard, setIsOpenedCard] = useState(false);
    const [userCard, setUserCard] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const openModal = (user) => {
        setUserCard(user);
        setIsOpenedCard(true);
    };

    const closeModal = () => {
        setUserCard(null);
        setIsOpenedCard(false);
    }

    const changeCurrentPage = pageId => setCurrentPage(pageId);

    const usersMap = users.map(item => {
        return <UserCard openModal={openModal} user={item} />
    });

    return (
        <div className='users-cards'>
            {usersMap}
            {isOpenedCard && <ModalUserCard closeModal={closeModal} user={userCard} />}
            <Pagination changePage={changeCurrentPage} currentPage={currentPage} pages={users.length / 6} />
        </div>
    )
}

export default inject(stores => ({
    users: stores.users,
}))(UsersCards);