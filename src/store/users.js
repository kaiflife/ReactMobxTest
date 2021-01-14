import { makeObservable, observable, action, computed } from "mobx"
import logoSvf from '../logo.svg';

export default class Users {
    users = [
        {id: 0, name: 'name1', surname: 'surname1', photo: logoSvf},
        {id: 1, name: 'name2', surname: 'surname2', photo: logoSvf},
        {id: 2, name: 'name3', surname: 'surname3', photo: logoSvf},
        {id: 3, name: 'name3', surname: 'surname3', photo: logoSvf},
        {id: 4, name: 'name4', surname: 'surname4', photo: logoSvf},
        {id: 5, name: 'name5', surname: 'surname5', photo: logoSvf},
        {id: 6, name: 'name6', surname: 'surname6', photo: logoSvf},
        {id: 7, name: 'name7', surname: 'surname7', photo: logoSvf},
        {id: 8, name: 'name8', surname: 'surname8', photo: logoSvf},
        {id: 9, name: 'name9', surname: 'surname9', photo: logoSvf},
    ]

    constructor() {
        makeObservable(this, {
            name: observable,
            surname: observable,
            photo: observable,
            get: computed,
            update: action,
            add: action,
        })
    }

    update({name, surname, photo}) {
        if(name) {
            this.name = name;
        }

        if(surname) {
            this.surname = surname;
        }

        if(photo) {
            this.photo = photo;
        }
    }

    get(id) {
        return this.users.find(item => item.id === id);
    }

    add(user) {
        this.users.push(user);
    }
}