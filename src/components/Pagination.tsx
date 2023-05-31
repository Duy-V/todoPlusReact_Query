import React, { useState } from "react";
interface PaginationProps {
  data: any[]; // your data type here
  RenderComponent: (item: any) => JSX.Element; // your component type here
  pageLimit: number;
  dataLimit: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  data,
  RenderComponent,
  pageLimit,
  dataLimit,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(data?.length / dataLimit);
  console.log(currentPage);
  function goToNextPage() {
    console.log(currentPage);
    if (currentPage >= Math.floor(data.length / dataLimit) + 1) return;
    setCurrentPage((page) => page + 1);
    onPageChange(currentPage + 1);
  }

  function goToPreviousPage() {
    if (currentPage === 1) return;
    setCurrentPage((page) => page - 1);
    onPageChange(currentPage - 1);
  }

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit)
      .fill(0)
      .map((_, idx) => start + idx + 1)
      .filter((item: any) => item < Math.floor(data?.length / dataLimit) + 1);
  };
  function changePage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
    // return pageNumber;
  }
  console.log(getPaginationGroup());
  return (
    <div className="btn-group grid grid-cols-2">
      <button
        onClick={goToPreviousPage}
        className={`btn btn-outline first-letter:paginationItem ${
          currentPage === 1 ? "disabled" : ""
        }`}
      >
        Previous page
      </button>

      {/* Show page numbers */}
      {getPaginationGroup().map((item: any, index: number) => (
        <button
          key={index}
          onClick={changePage}
          className={`btn paginationItem ${
            currentPage === item ? "active" : null
          }`}
        >
          <span>{item}</span>
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={goToNextPage}
        className={`btn btn-outline paginationItem ${
          currentPage === pages ? "disabled" : ""
        }`}
      >
        Next
      </button>
      <button></button>
    </div>
  );
};

export default Pagination;
