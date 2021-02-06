import React, { useCallback, useState, useEffect } from "react";

import { Wrapper, Heading, Option, Checkbox, Label } from "./Filter.styles";
import { FilterType } from "../../types";

const checkboxes = [
  { name: "all", label: "Все пересадки" },
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
    onFilter(
      allChecked
        ? [...checkedList]
        : checkedList.filter((filterName) => filterName !== "all")
    );
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
      {checkboxes.slice(1).map((checkbox) => (
        <Option key={checkbox.name}>
          <Checkbox
            id={checkbox.name}
            name={checkbox.name}
            checked={checkedList.includes(checkbox.name as FilterType)}
            onChange={handleChange}
          />
          <Label htmlFor={checkbox.name}>{checkbox.label}</Label>
        </Option>
      ))}
    </Wrapper>
  );
}

export default Filter;
