import styled from "styled-components";

const ButtonLink = styled.button`
    padding: 0.2rem 1.3rem;
    font-size: 0.9rem;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease-in;
    outline: none;
    &:hover {
        opacity: 0.8;
    }
`;

export default ButtonLink;
