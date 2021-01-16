import React, {useState} from "react";
import Modal from "./Modal";
import CustomInput from "./CustomInput";
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import logoSvf from '../logo.svg';

const ModalUserCard = inject('UsersStore')(observer(({
    UsersStore: usersStore,
    user = {name: '', surname: '', email: ''},
    closeModal,
    isNewUser,
}) => {
    const [userName, setUserName] = useState(user.name);
    const [userSurname, setUserSurname] = useState(user.surname);
    const [userEmail, setUserEmail] = useState(user.email);
    const [isDeleteUser, setIsDeleteUser] = useState(false);
    const [isDataSaved, setIsDataSaved] = useState(false);

    const onUpdateUser = () => {
        usersStore.update(user.id, {name: userName, surname: userSurname, email: userEmail});
        setIsDataSaved(true);
        setTimeout(() => setIsDataSaved(false), 3000);
    }
    const onDeleteUser = () => setIsDeleteUser(true);
    const addUser = () => {
        usersStore.add({name: userName, surname: userSurname, email: userEmail, photo: logoSvf});
        closeModal();
    }

    const acceptDeleteUser = () => {
        closeModal();
        usersStore.delete(user.id);
    }
    const declineDeleteUser = () => setIsDeleteUser(false);

    const firstParagraphText = isDeleteUser ? 'Yes' : 'Delete user';
    const secondParagraphText = isDeleteUser ? 'No' : 'Save';

    const isDataChanged = userName !== user.name || userSurname !== user.surname || userEmail !== user.email;
    const isNewUserDataFilled = userName && userSurname && userEmail;

    return (
        <Modal transparentModal closeModal={closeModal} classes='modal-user-card'>
            <div className='user-info'>
                <img className='big-user-avatar mr-1' src={user.photo} alt='' />
                <div>
                    <CustomInput placeholder='Your name' label='Name' value={userName} onChange={(value) => setUserName(value)}  />
                    <CustomInput placeholder='Your surname' label='Surname' value={userSurname} onChange={(value) => setUserSurname(value)} />
                    <CustomInput inputType='email' placeholder='test@gmail.com' label='Email' value={userEmail} onChange={(value) => setUserEmail(value)} />
                </div>
                {
                    isNewUser ? (
                            isNewUserDataFilled &&
                        <div className='w-100'>
                            <button
                                onClick={addUser}
                                className='button button-blue button-transparent button-yellow'
                            >
                                Создать
                            </button>
                        </div>

                        ) :
                        <div className='w-100 d-flex d-flex-wrap'>
                            {isDeleteUser && <p className='w-100'>Вы действительно хотите удалить пользователя?</p>}
                            <button className='button button-transparent button-red' onClick={isDeleteUser ? acceptDeleteUser : onDeleteUser}>{firstParagraphText}</button>
                            {(isDeleteUser || isDataChanged) && <button  className='button button-blue ml-1' onClick={isDeleteUser ? declineDeleteUser : onUpdateUser}>{secondParagraphText}</button>}
                            {isDataSaved && <p className='alert alert-green w-100'>Данные сохранены</p>}
                        </div>

                }

            </div>
        </Modal>
    )
}));
export default ModalUserCard;