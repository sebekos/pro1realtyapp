import React from "react";
import spinner from "./spinner.gif";
import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    left: 50%;
    z-index: 1;
`;

const Img = styled.img`
    max-height: 100px;
    max-width: 100px;
    transform: translate(-50%, -50%);
`;

export default () => (
    <Container>
        <Img src={spinner} style={{ width: "200px", margin: "auto", display: "block" }} alt="Loading..." />
    </Container>
);
