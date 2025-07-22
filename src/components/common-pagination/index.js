"use client"

import { useCallback, useState } from "react";
import "./styles.scss";

import { CButton } from "@coreui/react";
import { usePathname, useSearchParams } from "next/navigation";

const LIMIT_ITEM_36_A_PAGE = 36;
const MAX_VISIBLE_PAGES = 5;

export const CommonPagination = (props) => {
  const { recordcount, limitItemInPage, currentPageDefault, children } = props || {};

  const pathName = usePathname();
  const searchParams = useSearchParams();

  let [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1"));

  const updatePageInUrl = useCallback((page) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page == null || page == 1) {
      params.delete('page');
    } else {
      params.set('page', page);
    }
    window.history.pushState({}, '', `${pathName}?${params.toString()}`);
  }, [pathName, searchParams]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updatePageInUrl(page);
  };

  if (currentPageDefault != currentPage) currentPage = currentPageDefault;

  // Calculate pagination
  const totalPages = Math.ceil(recordcount / limitItemInPage);
  const startIndex = (currentPage - 1) * limitItemInPage;
  const endIndex = startIndex + limitItemInPage;

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = MAX_VISIBLE_PAGES;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
      <CButton
        className="btn btn-outline-secondary"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        第一页
      </CButton>
      <CButton
        className="btn btn-outline-secondary"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        上一页
      </CButton>

      {currentPage > 3 && getPageNumbers()[0] !== 1 && (
        <>
          <CButton
            className="btn btn-outline-secondary"
            onClick={() => handlePageChange(1)}
          >
            1
          </CButton>
          {currentPage > 4 && <span>...</span>}
        </>
      )}

      {getPageNumbers().map((page) => (
        <CButton
          key={page}
          className={`btn ${currentPage === page ? 'btn-active' : 'btn-outline-secondary'}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </CButton>
      ))}

      {currentPage < totalPages - 2 && getPageNumbers().slice(-1)[0] !== totalPages && (
        <>
          {currentPage < totalPages - 3 && <span>...</span>}
          <CButton
            className="btn btn-outline-secondary"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </CButton>
        </>
      )}

      <CButton
        className="btn btn-outline-secondary"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        下一页
      </CButton>
      <CButton
        className="btn btn-outline-secondary"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        末尾页
      </CButton>
    </div>
  )

}