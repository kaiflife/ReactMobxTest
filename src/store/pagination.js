import { makeObservable, observable, action, computed } from "mobx"

export default class Pagination {
    currentPage = 1;

    constructor() {
        makeObservable(this, {
            currentPage: observable,
            get: computed,
            update: action,
        })
    }

    update(page) {
        this.currentPage = page || 1;
    }

    get() {
        return this.currentPage;
    }
}