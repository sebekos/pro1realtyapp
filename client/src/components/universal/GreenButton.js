import styled from "styled-components";

const GreenButton = styled.button`
    color: white;
    padding: 0.2rem 1.3rem;
    font-size: 0.9rem;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease-in;
    outline: none;
    background-color: #28a745;
    &:hover {
        opacity: 0.8;
    }
    & > a {
        color: white;
    }
`;

export default GreenButton;
