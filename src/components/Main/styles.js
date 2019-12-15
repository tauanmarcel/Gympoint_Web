import styled from 'styled-components';
import { darken } from 'polished';

export const Center = styled.div`
    max-width: 1024px;
    margin: 0 auto;
`;

export const ContentTop = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 35px 0 20px;

    h1 {
        width: 50%;
        color: #444;
    }

    aside {
        width: 50%;
        text-align: right;
        display: inline-block;

        > a > button {
            float: right;
            height: 36px;
            width: 142px;
            background: rgba(222, 59, 59, 1);
            border: 0;
            border-radius: 4px;
            color: #fff;
            margin-right: 15px;

            &:hover {
                background: ${darken(0.08, 'rgba(222, 59, 59, 1)')};
            }

            svg {
                margin-right: 5px;
            }
        }

        form {
            float: right;

            > svg {
                color: #999;
                margin-right: -30px;
                width: 30px;
                position: relative;
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
    display: flex;
    border-radius: 4px;
    padding: 20px 25px;

    table {
        align-self: stretch;
        flex: 1;
        border-collapse: collapse;

        thead {
            tr {
                th {
                    padding: 15px 0;
                    font-size: 14px;
                    color: #444;
                    text-align: left;
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

                    span {
                        text-align: center;
                        width: 25%;
                        display: block;
                    }
                }
            }
        }
    }
`;

export const Edit = styled.button`
    color: rgba(77, 133, 238, 1);
    padding: 0 10px;
    background: transparent;
    border: none;

    &:hover {
        color: ${darken(0.2, 'rgba(77, 133, 238, 1)')};
    }
`;

export const Del = styled.button`
    color: rgba(222, 59, 59, 1);
    padding: 0 10px;
    background: transparent;
    border: none;

    &:hover {
        color: ${darken(0.15, 'rgba(222, 59, 59, 1)')};
    }
`;
