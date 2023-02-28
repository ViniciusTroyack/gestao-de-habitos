import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
}

:root {
    --bkgdColor: #E5E5E5;
}

body {
    background-color: var(--bkgdColor);
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    min-width: 90vw;
    max-width: 100vw;
    -webkit-font-smoothing: antialiased !important;
    overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6, strong {
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
}

button {
    cursor: pointer;
}

a {
    text-decoration: none;
}

li {
    list-style-type: none;
}

`;
