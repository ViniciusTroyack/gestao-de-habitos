import styled from "styled-components";

export const StyledButton = styled.button`
    cursor: pointer;
    background-color: #5965E0;
    color: white;
    border: none;
    border-radius: 15px;
    box-sizing: border-box;
    margin: 1em;
    padding: 1em 2em;

    button:hover {
    transition: all 250ms linear;
    opacity: .60;     
    }

    button:active {
    transition: all 150ms linear;
    opacity: .75;
} 


`

