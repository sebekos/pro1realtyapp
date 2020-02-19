import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import SortableImageContainer from "./SortableImageContainer";

const ImgContainer = SortableContainer(props => {
    return (
        <div>
            {props.images.map((image, index) => (
                <SortableImageContainer key={index} index={index} image={image} />
            ))}
        </div>
    );
});

export default ImgContainer;
