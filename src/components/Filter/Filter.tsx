import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 10px 0;

  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Heading = styled.h1`
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: #ffffff;
  margin-left: 20px;
`;

const Option = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;

  &:hover {
    background: #f1fcff;
  }
`;

const OptionLabel = styled.label`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  background: #2196f3;
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

function Filter() {
  return (
    <Wrapper>
      <Heading>Количество пересадок</Heading>
      <Option>
        <Checkbox />
        <OptionLabel>Все</OptionLabel>
      </Option>
      <Option>
        <Checkbox />
        <OptionLabel>Без пересадок</OptionLabel>
      </Option>
      <Option>
        <Checkbox />
        <OptionLabel>1 пересадка</OptionLabel>
      </Option>
      <Option>
        <Checkbox />
        <OptionLabel>2 пересадки</OptionLabel>
      </Option>
      <Option>
        <Checkbox />
        <OptionLabel>3 пересадки</OptionLabel>
      </Option>
    </Wrapper>
  );
}

export default Filter;
