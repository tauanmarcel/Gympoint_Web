import styled from 'styled-components';
import { darken } from 'polished';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
    header {
        background: #fff;
        margin: 0 auto;
        border: solid 1px #ddd;
        border-top: none;
        display: flex;

        img {
            margin: 12px;
            padding: 3px 25px;
            border-right: solid 1px #ddd;
        }

        ul {
            display: flex;
            align-items: center;
            margin-left: 20px;
        }

        div {
            align-items: center;
            flex-direction: row;
            align-self: center;
            margin-left: auto;
            padding: 0 30px;
            text-align: right;

            p {
                font-weight: bold;
                margin-bottom: 2px;
                color: #667;
            }

            button {
                color: rgba(222, 59, 59, 1);
                font-weight: bold;
                background: none;
                border: none;

                &:hover {
                    color: ${darken(0.15, 'rgba(222, 59, 59, 1)')};
                }
            }
        }
    }
`;

export const Nav = styled(NavLink)`
    margin-right: 25px;
    color: #999;
    font-weight: bold;
`;
