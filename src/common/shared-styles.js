import styled, { css } from 'styled-components';

export const button = css`
    color: #007bff;
    &.disabled {
        color: lightgray;
        cursor: not-allowed;
    }
    &:hover:not(.disabled) {
        color: darkblue;
        cursor: pointer;
    }
`;

export const DirectoriesList = styled.ul`
    list-style-type: none;
    margin-bottom: 1px;
`;
