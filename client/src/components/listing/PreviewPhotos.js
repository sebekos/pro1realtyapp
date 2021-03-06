import React from "react";
import styled from "styled-components";

const PhotosContainer = styled.div`
    display: grid;
    grid-template-columns: 600px 200px;
    box-sizing: border-box;
    overflow: hidden;
    height: 400px;
    -webkit-box-shadow: 0 1px 2px 1px #000000;
    -moz-box-shadow: 0 1px 2px 1px #000000;
    box-shadow: 0 1px 2px 1px #000000;
    @media (max-width: 680px) {
        display: flex;
        height: auto;
    }
`;

const MainPhotoContainer = styled.div`
    position: relative;
    padding-right: 5px;
    width: 600px;
    height: 400px;
    color: white;
    overflow: hidden;
    @media (max-width: 680px) {
        max-height: 250px;
        width 100%;
    }
`;

const MainPhoto = styled.img`
    width: 600px;
    height: 400px;
    object-fit: cover;
`;

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 400px;
    margin-left: 2px;
    @media (max-width: 680px) {
        max-height: 250px;
        display: none;
    }
`;

const ColumnPhotoContainer = styled.div`
    width: 200px;
    overflow: hidden;
    margin-bottom: 2px;
    height: 133px;
    background-color: black;
    color: white;
    text-align: center;
    &:last-child {
        margin-bottom: 0;
    }
`;

const ColumnPhotoThumb = styled.img`
    width: 200px;
    height: 133px;
    object-fit: cover;
    @media (max-width: 680px) {
        dispaly: none;
    }
`;

const PhotoCountContainer = styled.div`
    height: 25px;
    width: 50px;
    background-color: black;
    opacity: 0.5;
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    vertical-align: middle;
    color: white;
`;

const PreviewPhotos = ({ click, photos }) => {
    return (
        <PhotosContainer>
            <MainPhotoContainer>
                <MainPhoto onClick={click} src={photos[0]} alt="photo1" />
                <PhotoCountContainer>
                    <i className="fas fa-camera">{" " + photos.length}</i>
                </PhotoCountContainer>
            </MainPhotoContainer>
            <ColumnContainer>
                <ColumnPhotoContainer>
                    <ColumnPhotoThumb onClick={click} src={photos[1]} alt="photo2" />
                </ColumnPhotoContainer>
                <ColumnPhotoContainer>
                    <ColumnPhotoThumb onClick={click} src={photos[2]} alt="photo3" />
                </ColumnPhotoContainer>
                <ColumnPhotoContainer>
                    <ColumnPhotoThumb onClick={click} src={photos[3]} alt="photo4" />
                </ColumnPhotoContainer>
            </ColumnContainer>
        </PhotosContainer>
    );
};

export default PreviewPhotos;
