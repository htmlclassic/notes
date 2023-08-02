import { createGlobalStyle } from "styled-components";
import { FONT_SIZE } from "./globalVars";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;

    &::before, &::after {
      box-sizing: border-box;
    }

    &::-webkit-scrollbar {
      width: 3px;
      height: 3px;

      &:hover {
        width: 10px;
        height: 10px;
      }
    };

    &::-webkit-scrollbar-track {
      /* box-shadow: inset 0 0 6px rgba(0,0,0,0.2); */
    };

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  :root {
    font-family: 'Roboto', sans-serif;
    font-size: ${FONT_SIZE}%;
  }

  body {
    margin: 0;
    -webkit-tap-highlight-color: transparent;
    overflow: auto;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;