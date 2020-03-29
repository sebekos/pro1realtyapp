import styled from "styled-components";

const ButtonLink = styled.a`
    padding: 0.2rem 1.3rem;
    font-size: 0.9rem;
    border: none;
    cursor: pointer;
    margin-right: 0.5rem;
    transition: opacity 0.2s ease-in;
    outline: none;
    &:hover {
        opacity: 0.8;
    }
`;

export default ButtonLink;
