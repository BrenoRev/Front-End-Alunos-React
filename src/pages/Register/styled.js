import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    label {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    input {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px;
        width: 100%;
        margin-top: 5px;

        &:focus {
            border: 1px solid ${colors.primaryColor};
        }
    }
    
    button {
        cursor: pointer;
        background: ${colors.primaryColor};
        border: none;
        color: #fff;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: 700;
        transition: all 1000ms;
        
        &:hover {
            filter: brightness(85%); 
        }
    }

`