import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";

import { FilterType } from "../../types";

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
    cursor: pointer;
  }
`;

const Label = styled.label`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  cursor: pointer;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  background: #2196f3;
  margin-right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const checkboxes = [
  {
    name: "no-stops",
    label: "Без пересадок",
  },
  {
    name: "1 stop",
    label: "1 пересадка",
  },
  {
    name: "2 stops",
    label: "2 пересадки",
  },
  {
    name: "3 stops",
    label: "3 пересадки",
  },
];

type Props = {
  filters: Array<FilterType>;
  onFilter: (filters: Array<FilterType>) => void;
};

function Filter({ filters, onFilter }: Props) {
  const [checkedList, setCheckedList] = useState<Array<FilterType>>(filters);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    setAllChecked(checkedList.length === checkboxes.length);
    onFilter(allChecked ? ["all", ...checkedList] : checkedList);
  }, [allChecked, checkedList, onFilter]);

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allCheckboxNames = checkboxes.map(
      (checkbox) => checkbox.name as FilterType
    );

    setCheckedList(e.target.checked ? allCheckboxNames : []);
    setAllChecked(e.target.checked);
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checkboxName = e.target.name as FilterType;

      if (e.target.checked) {
        setCheckedList([...checkedList, checkboxName]);
      } else {
        setCheckedList(
          checkedList.filter((name: string) => name !== checkboxName)
        );
      }
    },
    [checkedList]
  );

  return (
    <Wrapper>
      <Heading>Количество пересадок</Heading>
      <Option>
        <Checkbox
          id="all"
          name="all"
          checked={allChecked}
          onChange={handleCheckAll}
        />
        <Label htmlFor="all">Все пересадки</Label>
      </Option>
      {checkboxes.map((checkbox: any) => (
        <Option key={checkbox.name}>
          <Checkbox
            id={checkbox.name}
            name={checkbox.name}
            checked={checkedList.includes(checkbox.name)}
            onChange={handleChange}
          />
          <Label htmlFor={checkbox.name}>{checkbox.label}</Label>
        </Option>
      ))}
    </Wrapper>
  );
}

export default Filter;
