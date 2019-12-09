import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    background: #ef4d62;
    height: 100%;
    display: flex;
    align-items: center;

    form {
        display: flex;
        flex-direction: column;
        width: 300px;
        background: #fff;
        padding: 20px 20px 50px;
        border-radius: 4px;
        margin: 0 auto;

        img {
            width: 130px;
            margin: 10px auto 20px;
        }

        label {
            font-size: 12px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }

        input {
            border: 0;
            border-radius: 4px;
            border: solid 1px #ccc;
            height: 44px;
            padding: 0 15px;
            margin: 0 0 10px;

            &::placeholder {
                color: #ccc;
            }
        }

        span {
            color: #ff8383;
            align-self: flex-start;
            margin: 0 0 10px;
        }

        hr {
            border: 0;
            height: 1px;
            background: rgba(255, 255, 255, 0.2);
            margin: 10px 0 20px;
        }

        button {
            margin: 5px 0 0;
            height: 44px;
            background: #ef4d62;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.05, '#ef4d62')};
            }
        }
    }
`;
