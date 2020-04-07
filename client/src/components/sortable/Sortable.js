import React, { useState } from "react";
import { arrayMove } from "react-sortable-hoc";
import ImgContainer from "./ImgContainer";
import { reOrderPhotos } from "../../Redux/actions/listing";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GreenButton from "../universal/GreenButton";
import LightButton from "../universal/LightButton";

const Container = styled.div`
    width: fit-content;
    margin: auto;
`;

const ButtonContainer = styled.div`
    width: fit-content;
    margin: 0 auto 0.5rem;
    & > button {
        margin-right: 5px;
    }
`;

const Buttons = ({ onSave }) => {
    return (
        <ButtonContainer>
            <GreenButton onClick={onSave}>Save</GreenButton>
            <Link to="/mylistings">
                <LightButton>Go To Listing</LightButton>
            </Link>
        </ButtonContainer>
    );
};

Buttons.propTypes = {
    onSave: PropTypes.func.isRequired
};

const TitleText = styled.div`
    color: #17a2b8;
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 1rem;
`;

const FollowText = styled.div`
    font-size: 1rem;
    margin-bottom: 1rem;
`;

const SortableContainer = styled.div`
    width: max-content;
    border: 1px solid grey;
    padding: 5px;
    margin: auto;
    background-color: lightgrey;
`;

const Sortable = ({ importImages, listingId, reOrderPhotos }) => {
    const [images, setImages] = useState(importImages);
    const onSortEnd = ({ oldIndex, newIndex }) => {
        setImages(arrayMove(images, oldIndex, newIndex));
    };
    const onSave = (e) => {
        reOrderPhotos(images, listingId);
    };
    return (
        <Container>
            <TitleText>Drag and drop photos then Save</TitleText>
            <FollowText>* Top photo will be the first image and thumbnail</FollowText>
            <Buttons onSave={onSave} />
            <SortableContainer>
                <ImgContainer images={images} onSortEnd={(oldIndex, newIndex) => onSortEnd(oldIndex, newIndex)} />
            </SortableContainer>
        </Container>
    );
};

Sortable.propTypes = {
    reOrderPhotos: PropTypes.func.isRequired
};

export default connect(null, { reOrderPhotos })(Sortable);
