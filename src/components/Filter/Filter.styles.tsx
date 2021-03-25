import styled from "styled-components";

import * as colors from "../../styles/colors";

export const Wrapper = styled.div`
  padding: 10px 0;

  background: ${colors.base};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

export const Heading = styled.h1`
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: ${colors.base};
  margin-left: 20px;
`;

export const Option = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;

  &:hover {
    background: ${colors.lightblue};
    cursor: pointer;
  }
`;

export const Label = styled.label`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  cursor: pointer;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  background: ${colors.blue};
  margin-right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
