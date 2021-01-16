import { makeObservable, observable, action, computed } from "mobx"

class PaginationStore {
    currentPage = 1;

    constructor() {
        makeObservable(this, {
            currentPage: observable,
            total: computed,
            update: action,
        });
    }

    update(page) {
        this.currentPage = page || 1;
    }

    get total() {
        return this.currentPage;
    }
}

const paginationStore = new PaginationStore();
export default paginationStore;