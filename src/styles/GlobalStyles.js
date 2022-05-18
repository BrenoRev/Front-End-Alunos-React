import styled, { createGlobalStyle } from "styled-components";
import * as colors from "../config/colors";
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }
    
    body {
        font-family: 'Courier New', Courier, monospace;
        background-color: ${colors.primaryDarkColor};
        color: ${colors.primaryDarkColor}
    }

    html, body, #root {
        height: 100%;
    }

    button {
        cursor: pointer;
        background-color: ${colors.primaryColor};
        border: none;
        color: #fff;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: 700;
    }

    a {
        text-decoration: none;
        color: ${colors.primaryColor};
    }

    ul {
        list-style: none;
    }

    body .Toastify .Toastify__toast-container .Toastify__toast--success {
        background: ${colors.successColor};
        color: white;
    }

    body .Toastify .Toastify__toast-container .Toastify__toast--error {
        background: ${colors.errorColor};
        color: white;
    }
`;

export const Container = styled.div`
    max-width: 480px;
    background-color: #fff;
    margin: 30px auto;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1 `
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
`