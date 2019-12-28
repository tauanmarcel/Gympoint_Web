import styled from 'styled-components';
import { darken } from 'polished';

export const ContentHelp = styled.div`
    max-width: 600px;
    margin: 0 auto;
`;

export const PopUp = styled.div`
    form {
        width: 350px;
        height: 400;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -175px;
        margin-top: -200px;
        background: #fff;
        border-radius: 4px;
        padding: 30px 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p {
            color: #667;
            padding: 10px 0 20px;
            line-height: 1.4;
        }

        textarea {
            resize: none;
            height: 130px;
            border-radius: 4px;
            border: solid 1px #ddd;
            padding: 10px;
            font-family: roboto;
            color: #667;
        }

        > button {
            width: 100%;
            border-radius: 4px;
            background: #ee4d64;
            height: 36px;
            border: none;
            color: #fff;
            font-weight: bold;
            margin-top: 15px;

            &:hover {
                background: ${darken(0.15, 'rgba(222, 59, 59, 1)')};
            }
        }

        > span {
            position: absolute;
            top: -13px;
            right: -13px;
            background: #fff;
            border-radius: 50%;
            width: 25px;
            height: 25px;

            button {
                background: transparent;
                border: none;

                svg {
                    position: absolute;
                    left: -2px;
                    top: -2px;
                }
            }
        }
    }
`;
