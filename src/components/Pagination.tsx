import React from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 2) pages.push(0);
      if (currentPage > 3) pages.push(-1); // means "..."

      const start = Math.max(0, currentPage - 1);
      const end = Math.min(totalPages, currentPage + 2);

      for (let i = start; i < end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) pages.push(-2); // means "..."
      if (currentPage < totalPages - 2) pages.push(totalPages - 1);
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button className="page-button"
        type="button"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        «
      </button>

      {getPageNumbers().map((page, index) =>
    page === -1 || page === -2 ? (
      <span key={index} className="page-dots">...</span>
    ) : (
      <button
        key={page}
        className={`page-button ${page === currentPage ? 'active' : ''}`}
        onClick={() => onPageChange(page)}
      >
        {page + 1}
      </button>
    )
  )}

  <button
    className="page-button"
    disabled={currentPage === totalPages - 1}
    onClick={() => onPageChange(currentPage + 1)}
  >
    »
  </button>
</div>
  );
};

export default Pagination;
