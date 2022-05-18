import styled from 'styled-components';
import * as colors from '../../config/colors';
export const Form = styled.form`
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    input {
        height: 40px;
        margin-bottom: 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding-left: 10px;
    }

`

export const ProfilePicture = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 20px;
    position: relative;

    img {
        width: 180px;
        height: 180px;
        border-radius: 50%;
    }

    a {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        bottom: 0;
        color: #fff;
        background-color: ${colors.primaryColor};
        width: 36px;
        height: 36px;
        border-radius: 50%;
    }
`