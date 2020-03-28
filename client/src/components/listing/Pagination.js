import React from "react";
import ReactPaginate from "react-paginate";
import ListingSummaryItem from "./ListingSummaryItem";

const Pagination = ({ pageClick, pages, listings }) => {
    const paginateDiv = (
        <div className="right-align">
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
    return (
        <div className="pagination-container">
            {paginateDiv}
            {listings.map(listing => (
                <ListingSummaryItem key={listing._id} listing={listing} listingId={listing._id}>
                    Listing
                </ListingSummaryItem>
            ))}
            {paginateDiv}
        </div>
    );
};

export default Pagination;
