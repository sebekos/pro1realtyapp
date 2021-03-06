import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DeleteItem from "./DeleteItem";
import { getListing, reOrderPhotos } from "../../Redux/actions/listing";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GreenButton from "../universal/GreenButton";
import DarkButton from "../universal/DarkButton";
import Spinner from "../layout/Spinner";

const DeletePhotosContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    max-width: 1300px;
    overflow: hidden;
    padding: 0 2rem;
    margin: 3rem auto;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
`;

const ButtonContainer = styled.div`
    width: fit-content;
    margin: auto;
`;

const SaveButton = styled(GreenButton)`
    margin-right: 5px;
`;

const DeleteContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`;

const DeletePhotos = ({ match, getListing, reOrderPhotos, listing: { listing, loading } }) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        getListing(match.params.id);
        setPhotos(loading || !listing.photos ? [] : listing.photos);
    }, [getListing, loading]);

    const onDelete = (e) => {
        let newPhotos = [];
        let image = e.target.value;
        newPhotos = photos.filter((photo) => {
            return photo !== image;
        });
        setPhotos(newPhotos);
    };

    const onSave = (e) => {
        e.preventDefault();
        reOrderPhotos(photos, match.params.id);
    };

    return (
        <DeletePhotosContainer>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <ButtonContainer>
                        <SaveButton onClick={onSave}>Save</SaveButton>
                        <DarkButton>
                            <Link to={`/listing/${listing._id}`}>Go To Listing</Link>
                        </DarkButton>
                    </ButtonContainer>
                    <DeleteContainer>
                        {!loading ? (
                            photos.map((photo, index) => <DeleteItem image={photo} ondelete={onDelete} key={index} />)
                        ) : (
                            <Spinner />
                        )}
                    </DeleteContainer>
                </>
            )}
        </DeletePhotosContainer>
    );
};

DeletePhotos.propTypes = {
    getListing: PropTypes.func.isRequired,
    reOrderPhotos: PropTypes.func.isRequired,
    listing: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    listing: state.listing
});

export default connect(mapStateToProps, { getListing, reOrderPhotos })(DeletePhotos);
