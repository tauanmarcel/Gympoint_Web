import styled from 'styled-components';

export const Col1 = styled.p`
    width: 100%;
    float: left;
`;

export const Col2 = styled.p`
    width: 50%;
    float: left;
`;

export const Col3 = styled.p`
    width: 32%;
    float: left;

    & + * {
        margin-left: 2%;
    }
`;

export const Col4 = styled.p`
    width: 25%;
    float: left;
`;

export const Col5 = styled.p`
    width: 20%;
    float: left;
`;
