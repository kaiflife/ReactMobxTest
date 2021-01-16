import {observable, action, makeAutoObservable} from "mobx"

class UsersStore {
    users = []

    constructor() {
        makeAutoObservable(this, {
            users: observable,
            update: action,
            add: action,
            loadUsers: action,
        });
    }

    update(newData) {
        const currentUser = this.users.find(user => user.id === newData.id);
        const userIndex = this.users.findIndex(user => user.id === newData.id);
        if(!currentUser) return;
        console.log(newData);
        console.log(currentUser);

        const updatedUser = {...currentUser, ...newData};

        this.users.splice(userIndex, 1, updatedUser);
    }

    add(user) {
        this.users.unshift(user);
    }

    loadUsers(users) {
        this.users = users;
    }

    delete(userId) {
        this.users = this.users.filter(user => user.id !== userId);
    }
}

const usersStore = new UsersStore();
export default usersStore;