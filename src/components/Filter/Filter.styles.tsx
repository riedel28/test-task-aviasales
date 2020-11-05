import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 10px 0;

  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

export const Heading = styled.h1`
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: #ffffff;
  margin-left: 20px;
`;

export const Option = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;

  &:hover {
    background: #f1fcff;
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
  background: #2196f3;
  margin-right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
