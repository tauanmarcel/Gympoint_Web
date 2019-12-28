import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';
import { Input, Select } from '@rocketseat/unform';

export const Center = styled.div`
    max-width: 1024px;
    margin: 0 auto;
`;

export const ContentTop = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 35px 0 20px;
    justify-content: space-between;

    h1 {
        color: #444;
    }

    aside {
        display: flex;

        form {
            > svg {
                color: #999;
                margin-right: -30px;
                width: 30px;
                position: relative;
                margin-left: 15px;
            }
            input {
                border: solid 1px #ddd;
                border-radius: 4px;
                height: 36px;
                width: 237px;
                text-indent: 25px;
            }
            span {
                color: rgba(222, 59, 59, 1);
            }
        }
    }
`;

export const ContentMain = styled.div`
    background: #fff;
    margin: 0 auto;
    border: solid 1px #ddd;
    display: inline-block;
    border-radius: 4px;
    padding: 20px 25px;
    width: 100%;

    table {
        align-self: stretch;
        flex: 1;
        border-collapse: collapse;
        width: 100%;

        thead {
            tr {
                th {
                    padding: 15px 0;
                    font-size: 14px;
                    color: #444;
                    text-align: left;

                    & + th {
                        text-align: center;
                    }
                }
            }
        }

        tbody {
            tr {
                height: 45px;

                & + tr {
                    border-top: solid 1px #ddd;
                }

                td {
                    text-align: left;
                    color: #667;
                    font-size: 14px;

                    & + td {
                        text-align: center;
                    }

                    button {
                        color: rgba(77, 133, 238, 1);
                        padding: 0 10px;
                        background: transparent;
                        border: none;

                        &:hover {
                            color: ${darken(0.2, 'rgba(77, 133, 238, 1)')};
                        }
                    }
                }
            }
        }
    }
`;

export const Edit = styled(Link)`
    color: rgba(77, 133, 238, 1);
    padding: 0 10px;
    background: transparent;
    border: none;

    &:hover {
        color: ${darken(0.2, 'rgba(77, 133, 238, 1)')};
    }
`;

export const Del = styled.button`
    color: rgba(222, 59, 59, 1) !important;
    padding: 0 10px;
    background: transparent;
    border: none;

    &:hover {
        color: ${darken(0.15, 'rgba(222, 59, 59, 1)')};
    }
`;

export const ContentForm = styled.div`
    margin-top: 15px;

    span {
        color: #ee4d64;
        display: block;
        margin-top: -18px;
        margin-bottom: 8px;
    }
`;

export const UnformInput = styled(Input)`
    border: solid 1px #ddd;
    border-radius: 4px;
    height: 36px;
    text-indent: 25px;
    width: 100%;
    margin-bottom: 20px;
`;

export const UnformSelect = styled(Select).attrs()`
    color: #999;
    border: solid 1px #ddd;
    border-radius: 4px;
    height: 36px;
    text-indent: 25px;
    width: 100%;
    margin-bottom: 20px;

    option {
        padding: 10px 0;
    }
`;

export const UnformLable = styled.label`
    margin-bottom: 5px;
    display: flex;
    color: #444;
    font-weight: bold;
`;

export const FormTop = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FormBottom = styled.div`
    display: flex;

    p {
        flex: 1;

        & + p {
            padding-left: 15px;
        }

        input {
            display: flex;
            justify-content: space-between;
            flex: 1;
        }
    }
`;
