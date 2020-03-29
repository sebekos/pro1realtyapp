import React from "react";
import styled from "styled-components";

const PhotosContainer = styled.div`
    display: grid;
    grid-template-columns: 600px 200px;
    box-sizing: border-box;
    overflow: hidden;
    max-height: 400px;
    -webkit-box-shadow: 0 1px 2px 1px #000000;
    -moz-box-shadow: 0 1px 2px 1px #000000;
    box-shadow: 0 1px 2px 1px #000000;
`;

const MainPhotoContainer = styled.div`
    padding-right: 5px;
    min-height: 400px;
    background-color: black;
    color: white;
    text-align: center;
`;

const MainPhoto = styled.img`
    max-height: 400px;
`;

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 400px;
    margin-left: 2px;
`;

const ColumnPhotoContainer = styled.div`
    max-width: 200px;
    overflow: hidden;
    margin-bottom: 2px;
    min-height: 133px;
    background-color: black;
    color: white;
    text-align: center;
`;

const ColumnPhoto = styled.img`
    max-width: 200px;
`;

const ColumnPhotoThumb = styled.img`
    max-width: 200px;
    @media (max-width: 680px) {
        dispaly: none;
    }
`;

const PreviewPhotos = ({ click, photos }) => {
    return (
        <PhotosContainer>
            <MainPhotoContainer>
                <MainPhoto onClick={click} src={photos[0]} alt="photo1" />
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
            {/* <img style={{ justifySelf: "start" }} onClick={click} src={photos[1]} alt="photo2" />
            <img style={{ justifySelf: "end" }} onClick={click} src={photos[2]} alt="photo3" />
            <img style={{ justifySelf: "start" }} onClick={click} src={photos[3]} alt="photo4" /> */}
        </PhotosContainer>
    );
};

export default PreviewPhotos;
