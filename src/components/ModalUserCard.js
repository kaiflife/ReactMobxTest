import React, {useState, useEffect} from "react";
import Modal from "./Modal";
import CustomInput from "./CustomInput";
import {inject} from "mobx-react";
import {observer} from "mobx-react-lite";
import logoSvf from '../logo.svg';
import axios from "axios";
import {usersUrl} from "../urls";

const ModalUserCard = inject('UsersStore')(observer(({
    UsersStore: usersStore,
    userId = null,
    closeModal,
    isNewUser,
}) => {
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isDeleteUser, setIsDeleteUser] = useState(false);
    const [isDataSavedStatus, setIsDataSavedStatus] = useState('');
    const [userFields, setUserFields] = useState({first_name: '', last_name: '', email: '', avatar: ''});

    useEffect(() => {
        if(userId === 0 || userId > 0) {
            getUserCard().catch(e => console.error('error get user', e));
        }
    }, [userId]);

    const getUserCard = async () => {
        const url = `${usersUrl}/${userId}`;
        const {data: {data}} = await axios.get(url);
        setUserEmail(data.email);
        setUserSurname(data.last_name);
        setUserName(data.first_name);
        setUserFields({...data});
    }

    const onUpdateUser = async () => {
        try {
            const data = {first_name: userName, last_name: userSurname, email: userEmail};
            const url = `${usersUrl}/${userId}`;
            const res = await axios.put(url, data);
            console.log('UPDATE USER');
            usersStore.update(res.data);
            setUserFields({...userFields, ...res.data});
            setIsDataSavedStatus('success');
        } catch (e) {
            setIsDataSavedStatus('fail');
            console.error('error update user', e);
        }
        setTimeout(() => setIsDataSavedStatus(''), 3000);
    }
    const onDeleteUser = () => setIsDeleteUser(true);

    const addUser = async () => {
        try {
            const url = `${usersUrl}/${userId}`;
            const res = await axios.put(url, {first_name: userName, last_name: userSurname, email: userEmail});
            console.log('ADD USER', res);
            usersStore.add({first_name: userName, last_name: userSurname, email: userEmail, avatar: logoSvf});
            closeModal();
        } catch (e) {
            console.error('error add user', e);
        }
    }

    const acceptDeleteUser = async () => {
        try {
            const url = `${usersUrl}/${userId}`;
            await axios.delete(url);
            usersStore.delete(userId);
            closeModal();
        } catch (e) {
            console.error('error delete user', e);
        }
    }
    const declineDeleteUser = () => setIsDeleteUser(false);

    const firstParagraphText = isDeleteUser ? 'Yes' : 'Delete user';
    const secondParagraphText = isDeleteUser ? 'No' : 'Save';

    const isDataChanged = userName !== userFields.first_name || userSurname !== userFields.last_name || userEmail !== userFields.email;
    console.log(userName, userSurname, userEmail, 'STATE');
    console.log(userFields.first_name, userFields.last_name, userFields.email, 'STORE');
    const isNewUserDataFilled = userName && userSurname && userEmail;

    const dataSaveText = isDataSavedStatus === 'success' ? 'Данные сохранены' : 'Ошибка Сохранения данных';
    const dataSaveClass = isDataSavedStatus === 'success' ? 'alert-green' : 'alert-red';

    return (
        <Modal transparentModal closeModal={closeModal} classes='modal-user-card'>
            <div className='user-info'>
                <img className='big-user-avatar mr-1' src={userFields.avatar} alt='' />
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
                            {isDataSavedStatus && <p className={`alert w-100 ${dataSaveClass}`}>{dataSaveText}</p>}
                        </div>
                }
            </div>
        </Modal>
    )
}));
export default ModalUserCard;