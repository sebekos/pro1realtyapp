import React from "react";
import { SortableElement } from "react-sortable-hoc";

const SortableImageContainer = SortableElement(props => {
    return (
        <div>
            <img className="sortable-img" src={props.image} alt="" />
        </div>
    );
});

export default SortableImageContainer;
