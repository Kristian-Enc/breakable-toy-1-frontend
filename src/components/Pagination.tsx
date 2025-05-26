import React from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const renderPageButtons = () => {
    const buttons = [];

    const startPage = Math.max(0, currentPage);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          type="button"
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div>
      <button type="button" onClick={() => onPageChange(0)} disabled={currentPage === 0}>«</button>
      {renderPageButtons()}
      {currentPage + 3 < totalPages && (
        <>
          <button
            type="button"
            onClick={() => {
              const userPage = prompt("Enter page number:");
              const page = Number(userPage) - 1;
              if (!isNaN(page) && page >= 0 && page < totalPages) {
                onPageChange(page);
              }
            }}
          >
            ...
          </button>
          <button type="button" onClick={() => onPageChange(totalPages - 1)}>»</button>
        </>
      )}
    </div>
  );
};

export default Pagination;
