import React from "react";
import { SortableElement } from "react-sortable-hoc";
import styled from "styled-components";

const SortableImg = styled.img`
    width: 200px;
    border: 1px solid black;
`;

const SortableImageContainer = SortableElement((props) => {
    return (
        <div>
            <SortableImg src={props.image} alt="" />
        </div>
    );
});

export default SortableImageContainer;
