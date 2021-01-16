import {makeObservable, observable, action, computed} from "mobx"

class PaginationStore {
    paginationData = {
        total_pages: 0,
        per_page: 0,
    }

    constructor() {
        makeObservable(this, {
            paginationData: observable,
            totalPages: computed,
            perPage: computed,
            update: action,
        });
    }

    update(data) {
        this.paginationData = {...this.paginationData, ...data};
    }

    get perPage() {
        return this.paginationData.per_page;
    }

    get totalPages() {
        return this.paginationData.total_pages;
    }
}

const paginationStore = new PaginationStore();
export default paginationStore;