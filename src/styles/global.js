import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @keyframes spin {
    0%  {-webkit-transform: rotate(0deg);}
    100% {-webkit-transform: rotate(360deg);}   
}
`;
