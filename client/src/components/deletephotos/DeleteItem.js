import React from 'react'

const DeleteItem = ({ image, ondelete }) => {
    return (
        <div className='img-delete-item' key={image}>
            <img className='img-delete-img' src={image} alt="" />
            <button image={image} className='btn btn-danger img-delete-btn' onClick={ondelete}>X</button>
        </div>
    )
}

export default DeleteItem
