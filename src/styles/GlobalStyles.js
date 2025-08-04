// GlobalStyles.js (new file)
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  body {
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.dark};
    line-height: 1.5;
  }

  button {
    cursor: pointer;
    transition: all 0.2s ease;
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input, textarea, select {
    &:focus {
      outline: 2px solid ${props => props.theme.colors.accent};
      outline-offset: 2px;
    }
  }

  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
`;

export default GlobalStyles;