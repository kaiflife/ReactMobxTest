import React from "react";

const Pagination = ({changePage, currentPage, pages = [1]}) => {

    const pagesMap = pages.map(item => {
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