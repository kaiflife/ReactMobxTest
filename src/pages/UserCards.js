import React, {useState, useEffect} from "react";
import UserCard from "../components/UserCard";
import ModalUserCard from "../components/ModalUserCard";
import Pagination from "../components/Pagination";
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import {usersUrl} from "../urls";
import axios from "axios";

const UsersCards = inject('UsersStore', 'PaginationStore')(observer(({PaginationStore, UsersStore}) => {
    const users = UsersStore.users;
    const pagesCount = PaginationStore.totalPages;
    const perPage = PaginationStore.perPage;
    const [isOpenedCard, setIsOpenedCard] = useState(false);
    const [userCard, setUserCard] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isOpenedNewUserModal, setIsOpenedNewUserModal] = useState(false);

    useEffect(() => {
            getUsers()
                .catch(e => console.error('error get one user', e));
    }, []);

    useEffect(() => {
        if(currentPage > pagesCount) {
            setCurrentPage(pagesCount);
        }
        if(currentPage === 0 && pagesCount > 0) {
            setCurrentPage(1);
        }
    }, [pagesCount]);

    const getUsers = async (page) => {
        let url = usersUrl;
        if(page) {
            url = `${usersUrl}/?page=${page}`;
        }
        const res = await axios.get(url);
        console.log(res);
        UsersStore.loadUsers(res.data.data);
        const per_page = res.data.per_page;
        const total_pages = res.data.total_pages;
        PaginationStore.update({per_page, total_pages})
    }

    const toggleModalNewUser = (value) => setIsOpenedNewUserModal(value);

    const openUserModal = user => {
        setUserCard(user.id);
        setIsOpenedCard(true);
    };

    const closeModal = () => {
        setIsOpenedCard(false);
        setUserCard(null);
    }

    if(!pagesCount) {
        return <div className='users-cards'><p>There are no users</p></div>
    }

    const changeCurrentPage = async pageNumber => {
        try {
            await getUsers(pageNumber);
            setCurrentPage(pageNumber);
        } catch (e) {
            console.error('cant get users', e);
        }
    }

    const usersMap = users.slice(0, perPage).map(user => {
        return <UserCard key={user.id} openModal={openUserModal} user={user} />
    });

    return (
        <div className='users-cards'>
            {usersMap}
            {isOpenedNewUserModal && <ModalUserCard isNewUser closeModal={() => toggleModalNewUser(false)} />}
            {isOpenedCard && <ModalUserCard closeModal={closeModal} userId={userCard} />}
            <Pagination changePage={changeCurrentPage} currentPage={currentPage} pages={pagesCount} />
            <button onClick={() => toggleModalNewUser(true)} className='fab-bottom-right fab-green radius-50 button floating-action-button'>+</button>
        </div>
    )
}));

export default UsersCards;