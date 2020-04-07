import React from "react";
import ReactPaginate from "react-paginate";
import ListingSummaryItem from "./ListingSummaryItem";
import styled from "styled-components";

const ListingsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-sizing: border-box;
    justify-items: center;
    @media (max-width: 1280px) {
        grid-template-columns: 1fr;
        justify-items: center;
    }
`;

const PaginationContainer = styled.div`
    margin: auto;
`;

const Pagination = ({ pageClick, pages, listings, currPage }) => {
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
                forcePage={currPage}
            />
        </div>
    );
    return (
        <PaginationContainer>
            {paginateDiv}
            <ListingsContainer>
                {listings.map((listing) => (
                    <ListingSummaryItem key={listing._id} listing={listing} listingId={listing._id}>
                        Listing
                    </ListingSummaryItem>
                ))}
            </ListingsContainer>
            {paginateDiv}
        </PaginationContainer>
    );
};

export default Pagination;
