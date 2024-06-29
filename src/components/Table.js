/**
 * 표에 CSS를 적용한 styledComponent
 */
import styled from 'styled-components';
import mq from './MediaQuery';

const Table = styled.table`
    border-collapse: collapse;
    border-top: 3px solid #168;
    font-size: 14px;
    text-align: center;
    margin: auto;
    width: 100%;

    th {
        color: #168;
        background: #f0f6f9;
        padding: 10px;
        border: 1px solid #ddd;

        &:first-child {
            border-left: 0;
        }

        &:last-child {
            border-right: 0;
        }
    }

    td {
        padding: 10px;
        border: 1px solid #ddd;

        &:first-child {
            border-left: 0;
        }

        &:last-child {
            border-right: 0;
        }
    }

    ${mq.maxWidth("lg")`
      th:nth-of-type(4),
      th:nth-of-type(5),
      td:nth-of-type(4),
      td:nth-of-type(5) {
        display: none
      } 
    `}
    ${mq.maxWidth("md")`
      th:nth-of-type(6),
      td:nth-of-type(6) {
        display: none
      } 
    `}

`;

export default Table;