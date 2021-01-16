import React from "react";
import {range} from "../helpers/array";

const Pagination = ({changePage, currentPage, pages = 1}) => {
    const pagesArray = range(pages, 1);

    const pagesMap = pagesArray.map(item => {
        const classActivePage =  item === currentPage ? 'active-page' : '';
        return <p onClick={() => changePage(item)} className={classActivePage} key={item}>{item}</p>;
    });

    return (
        <div className='pagination'>
            {pagesMap}
        </div>
    )
}

export default Pagination;