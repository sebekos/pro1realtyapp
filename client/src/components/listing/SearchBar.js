import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import GenInput from "../universal/GenInput";
import DropDown from "../universal/DropDown";
import PrimaryButton from "../universal/PrimaryButton";

const Container = styled.div`
    display: flex;
    justify-self: end;
    margin-bottom: 10px;
    & > input {
        margin-bottom: 0px;
        margin-right: 2px;
    }
    & > select {
        margin-bottom: 0px;
    }
`;

const SearchBar = ({ onChange, onSearch, listing: { zipcode, type, group } }) => {
    return (
        <Container>
            <GenInput onChange={onChange} name="zipcode" value={zipcode} type="text" placeholder="Zipcode" />
            <DropDown name="group" value={group} onChange={onChange}>
                <option>All</option>
                <option>Commercial</option>
                <option>Residential</option>
            </DropDown>
            <DropDown name="type" value={type} onChange={onChange}>
                <option>Newest</option>
                <option>Oldest</option>
                <option>High Price</option>
                <option>Low Price</option>
            </DropDown>
            <PrimaryButton onClick={onSearch} type="submit">
                Search
            </PrimaryButton>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    listing: state.listing
});

export default connect(mapStateToProps, null)(SearchBar);
