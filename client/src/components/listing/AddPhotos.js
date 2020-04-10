import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import { uploadPhotos, getListing, setLoadingTrue, progressBarValue, toggleProgressBar } from "../../Redux/actions/listing";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { bulkResize } from "../../utils/photo";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import styled from "styled-components";
import ProgressBar from "../layout/ProgressBar";
import GreenButton from "../universal/GreenButton";

const Container = styled.div`
    max-width: 1300px;
    margin: auto;
    overflow: hidden;
    padding: 0 2rem;
    margin: 3rem auto;
`;

const UploadButton = styled(GreenButton)`
    margin-bottom: 1rem;
`;

const UploadContainer = styled.div`
    text-align: center;
    width: fit-content;
    margin: 5px auto;
    -webkit-box-shadow: 1px 1px 3px 2px #ccc;
    -moz-box-shadow: 1px 1px 3px 2px #ccc;
    box-shadow: 1px 1px 3px 2px #ccc;
`;

const AddPhotos = ({ uploadPhotos, match, listing: { loading, progressbar, listing }, getListing, setLoadingTrue }) => {
    const [pictures, setPictures] = useState([]);
    const [uploadBtn, setUploadBtn] = useState(false);
    const [redir, setRedir] = useState(false);

    useEffect(() => {
        getListing(match.params.id);
    }, [match.params.id]);

    const onDrop = (picture) => {
        setPictures(picture);
        if (picture.length > 0) {
            setUploadBtn(true);
            setRedir(false);
        } else {
            setUploadBtn(false);
        }
    };

    const onUpload = async (e) => {
        const total = listing.photos.length + pictures.length;
        if (total > 10) {
            toast.error("Max photos is 10, currently at " + total);
            return;
        }
        setLoadingTrue();
        setUploadBtn(false);
        let res = await bulkResize(pictures);
        let formData = new FormData();
        formData.append("group", match.params.id);
        res.map((photo, index) => {
            formData.append(`photo-${index}`, photo);
        });
        await uploadPhotos(formData);
        setUploadBtn(true);
        toast.success("Photos uploaded successfully");
        setRedir(true);
        setUploadBtn(false);
    };

    return (
        <Container>
            {loading ? <Spinner /> : null}
            <UploadContainer>
                <ImageUploader
                    withIcon={false}
                    buttonText="Choose Images"
                    onChange={(pictures) => onDrop(pictures)}
                    imgExtension={[".jpg", ".gif", ".png", ".gif", "jpeg"]}
                    maxFileSize={30485760}
                    withPreview={true}
                />
                {uploadBtn ? (
                    <UploadButton className="upload-btn" onClick={onUpload}>
                        Upload Images
                    </UploadButton>
                ) : null}
                {redir ? (
                    <a href={`/listing/${match.params.id}`}>
                        <UploadButton>Go To Listing</UploadButton>
                    </a>
                ) : null}
                {progressbar ? <ProgressBar /> : null}
            </UploadContainer>
        </Container>
    );
};

AddPhotos.propTypes = {
    getListing: PropTypes.func.isRequired,
    uploadPhotos: PropTypes.func.isRequired,
    setLoadingTrue: PropTypes.func.isRequired,
    progressBarValue: PropTypes.func.isRequired,
    toggleProgressBar: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    listing: state.listing
});

export default connect(mapStateToProps, {
    uploadPhotos,
    getListing,
    setLoadingTrue,
    progressBarValue,
    toggleProgressBar
})(AddPhotos);
