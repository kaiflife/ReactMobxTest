import {observable, action, makeAutoObservable} from "mobx"
import logoSvf from '../logo.svg';

class UsersStore {
    users = [
        {id: 0, name: 'name0', surname: 'surname0', email: '', photo: logoSvf},
        {id: 1, name: 'name1', surname: 'surname1', email: '', photo: logoSvf},
        {id: 2, name: 'name2', surname: 'surname2', email: '', photo: logoSvf},
        {id: 3, name: 'name3', surname: 'surname3', email: '', photo: logoSvf},
        {id: 4, name: 'name4', surname: 'surname4', email: '', photo: logoSvf},
        {id: 5, name: 'name5', surname: 'surname5', email: '', photo: logoSvf},
        {id: 6, name: 'name6', surname: 'surname6', email: '', photo: logoSvf},
        {id: 7, name: 'name7', surname: 'surname7', email: '', photo: logoSvf},
        {id: 8, name: 'name8', surname: 'surname8', email: '', photo: logoSvf},
        {id: 9, name: 'name9', surname: 'surname9', email: '', photo: logoSvf},
    ]

    constructor() {
        makeAutoObservable(this, {
            users: observable,
            update: action,
            add: action,
        });
    }

    update(id, {name, surname, email}) {
        const currentUser = this.users.find(user => user.id === id);
        const userIndex = this.users.findIndex(user => user.id === id);
        if(!currentUser) return;

        if(name) currentUser.name = name;
        if(surname) currentUser.surname = surname;
        if(email) currentUser.email = email;

        this.users.splice(userIndex, 1, currentUser);
    }

    add(user) {
        this.users.unshift(user);
    }

    delete(userId) {
        this.users = this.users.filter(user => user.id !== userId);
    }
}

const usersStore = new UsersStore();
export default usersStore;