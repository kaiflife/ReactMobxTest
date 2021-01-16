import React, {useState, useEffect} from "react";
import UserCard from "../components/UserCard";
import ModalUserCard from "../components/ModalUserCard";
import Pagination from "../components/Pagination";
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";

const usersOnPage = 6;

const UsersCards = inject('UsersStore')(observer(({UsersStore: usersStore}) => {
    const users = usersStore.users;
    const pagesCount = Math.ceil(users.length / usersOnPage);
    const [isOpenedCard, setIsOpenedCard] = useState(false);
    const [userCard, setUserCard] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpenedNewUserModal, setIsOpenedNewUserModal] = useState(false);

    useEffect(() => {
        if(currentPage > pagesCount) {
            setCurrentPage(pagesCount);
        }
    }, [pagesCount]);

    const toggleModalNewUser = (value) => setIsOpenedNewUserModal(value);

    const openUserModal = (user) => {
        setUserCard(user);
        setIsOpenedCard(true);
    };

    const closeModal = () => {
        setUserCard(null);
        setIsOpenedCard(false);
    }

    const changeCurrentPage = pageId => setCurrentPage(pageId);

    const usersMap = users.slice((currentPage-1)*usersOnPage, currentPage*usersOnPage).map(user => {
        return <UserCard key={user.id} openModal={openUserModal} user={user} />
    });

    return (
        <div className='users-cards'>
            {usersMap}
            {isOpenedNewUserModal && <ModalUserCard isNewUser closeModal={() => toggleModalNewUser(false)} />}
            {isOpenedCard && <ModalUserCard closeModal={closeModal} user={userCard} />}
            <Pagination changePage={changeCurrentPage} currentPage={currentPage} pages={pagesCount} />
            <button onClick={() => toggleModalNewUser(true)} className='fab-bottom-right fab-green radius-50 button floating-action-button'>+</button>
        </div>
    )
}));

export default UsersCards;