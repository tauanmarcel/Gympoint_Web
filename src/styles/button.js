import styled from 'styled-components';
import { darken } from 'polished';

export const BtnRed = styled.button`
    float: right;
    height: 36px;
    width: 142px;
    background: rgba(222, 59, 59, 1);
    border: 0;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;

    &:hover {
        background: ${darken(0.08, 'rgba(222, 59, 59, 1)')};
    }

    svg {
        margin-right: 5px;
    }
`;

export const BtnGrey = styled.button`
    float: right;
    height: 36px;
    width: 142px;
    background: rgba(204, 204, 204, 1);
    border: 0;
    border-radius: 4px;
    color: #fff;
    margin-right: 15px;
    font-weight: bold;

    &:hover {
        background: ${darken(0.08, 'rgba(204,204,204, 1)')};
    }

    svg {
        margin-right: 5px;
    }
`;
