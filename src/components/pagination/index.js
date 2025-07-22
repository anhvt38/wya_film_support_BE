"use client";
import ReactPaginate from 'react-paginate';

import "./styles.scss";
import { useState } from 'react';



export const Pagination = ({ total = 0, page = 1, pageSize = 10, initialPage = 0 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageCount = Math.ceil(total / pageSize);
    const onPageChange = (page) => {
        setCurrentPage(page);
      };

    return (
        <ReactPaginate
            initialPage={initialPage}
            breakLabel="..."
            nextLabel="»"
            onPageChange={({selected}) => onPageChange(selected)}
            marginPagesDisplayed={3}
            pageCount={pageCount}
            previousLabel="«"
            renderOnZeroPageCount={null}
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
        />

    )
}