import React from 'react'
import { SortableElement } from 'react-sortable-hoc';

const SortableImageContainer = SortableElement((props) => {
    return (
        <div >
            <img className='img-sortable' src={props.image} alt='' />
        </div>
    )
})

export default SortableImageContainer
