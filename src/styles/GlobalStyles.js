import styled, { createGlobalStyle } from "styled-components";
import {primaryColor, primaryDarkColor} from "../config/colors";

export default createGlobalStyle`
  * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }
    
    body {
        font-family: 'Courier New', Courier, monospace;
        background-color: ${primaryDarkColor};
        color: ${primaryDarkColor}
    }

    html, body, #root {
        height: 100%;
    }

    button {
        cursor: pointer;
        background-color: ${primaryColor};
        border: none;
        color: #fff;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: 700;
    }

    a {
        text-decoration: none;
        color: ${primaryColor};
    }

    ul {
        list-style: none;
    }
`;

export const Container = styled.div`
    max-width: 360px;
    background-color: #fff;
    margin: 30px auto;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;