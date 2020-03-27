import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageClick, pages }) => {
    return (
        <div className="pagination-container">
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={pageClick}
                containerClassName={"pagination-ul-container"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active-pagination"}
            />
        </div>
    );
};

export default Pagination;
