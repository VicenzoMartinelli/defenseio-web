import styled from "styled-components";

export const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: ${props => props.w};
  height: ${props => props.h};
  background-color: ${props => props.bgColor};
`;
