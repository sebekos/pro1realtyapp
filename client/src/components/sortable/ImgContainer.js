import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import SortableImageContainer from "./SortableImageContainer";
import styled from "styled-components";

const ImageSep = styled.div`
    text-align: center;
`;

const ImgContainer = SortableContainer((props) => {
    return (
        <ImageSep className="sort-img-sep">
            {props.images.map((image, index) => (
                <SortableImageContainer key={index} index={index} image={image} />
            ))}
        </ImageSep>
    );
});

export default ImgContainer;
