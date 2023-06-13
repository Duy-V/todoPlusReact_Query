import React, { useState } from "react";
interface PaginationProps {
  lastPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  setCurrentPage,
  // onPageChange,
}) => {
  function goToNextPage() {
    console.log(currentPage);
    setCurrentPage((page: number) => page + 1);
  }

  function goToPreviousPage() {
    if (currentPage === 1) return;
    setCurrentPage((page: number) => page - 1);
  }

  console.log(currentPage);
  return (
    <div className="flex gap-2">
      <button
        onClick={goToPreviousPage}
        className="btn btn-outline first-letter:paginationItem "
        disabled={currentPage === 1}
      >
        Previous page
      </button>

      <button className="btn paginationItem">
        <span>{currentPage}</span>
      </button>

      {/* Next Button */}
      <button
        onClick={goToNextPage}
        className="btn btn-outline paginationItem "
        disabled={currentPage === lastPage}
      >
        Next
      </button>
      <button></button>
    </div>
  );
};

export default Pagination;
