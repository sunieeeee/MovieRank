import styled from 'styled-components';
import mq from '../components/MediaQuery';

const MovieContainer = styled.main`
  .inner {
    margin: 0 auto; 
    padding: 60px 0; 
    max-width: 1100px; 
    width: 100%;

    ${mq.maxWidth("lg")`
      padding: 30px 20px;
    `}
  }

  h1 {
    font-size: 36px;
    font-weight: 600;
    color: #333;

    ${mq.maxWidth("md")`
      font-size: 28px;
    `}
  }

  .formContent {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    margin: 40px 0 15px;

    ${mq.maxWidth("md")`
      flex-direction: column;
      align-items: flex-start;
      margin: 25px 0 15px;
    `}

    form {
      padding: 5px 10px;
      width: fit-content;
      border: 1px solid #333;
      border-radius: 6px;
      
      input {
        font-size: 16px;
        color: #333;
        border: 0;
        outline: none;
      }
    }
  
    span {
      display: inline-block;
      font-size: 14px;
      color: #444;
    }
  }

  table {
    color: #333;
  }
`;

export default MovieContainer;