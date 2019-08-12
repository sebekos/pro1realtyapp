import React from 'react'

const DeleteItem = ({ image, ondelete }) => {
    return (
        <div className='img-delete-item' key={image}>
            <img className='img-delete-img' src={image} alt="" />
            <button className='btn btn-danger img-delete-btn' onClick={e => ondelete(e, image)}>X</button>
        </div>
    )
}

export default DeleteItem
