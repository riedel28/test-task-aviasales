import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Filter from './Filter';
import { FilterType } from '../../types';

describe('Filter', () => {
  const filters: FilterType[] = [
    'all',
    'no-stops',
    '1 stop',
    '2 stops',
    '3 stops'
  ];

  test('renders correctly', () => {
    const handleFilter = jest.fn();
    const { getByText } = render(
      <Filter filters={filters} onFilter={handleFilter} />
    );

    expect(getByText('Количество пересадок')).toBeInTheDocument();
  });

  test('renders all checkboxes', () => {
    const handleFilter = jest.fn();
    const { getAllByRole } = render(
      <Filter filters={filters} onFilter={handleFilter} />
    );

    const checkboxes = getAllByRole('checkbox');

    expect(checkboxes).toHaveLength(5);
  });

  test('toggles checkbox', () => {
    const handleFilter = jest.fn();
    const { getByLabelText } = render(
      <Filter filters={filters} onFilter={handleFilter} />
    );

    const firstCheckbox = getByLabelText('Все пересадки');

    expect(firstCheckbox).toBeChecked();

    fireEvent.click(firstCheckbox);

    expect(firstCheckbox).not.toBeChecked();
  });

  test("unchecks all checkboxes by unchecking on 'All stops' checkbox", () => {
    const handleFilter = jest.fn();
    const { getAllByRole } = render(
      <Filter filters={filters} onFilter={handleFilter} />
    );

    const allCheckboxes = getAllByRole('checkbox');
    const [firstCheckbox] = allCheckboxes;

    allCheckboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });

    fireEvent.click(firstCheckbox);

    allCheckboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  test("unchecks 'All stops' checkbox by clicking on at least one other checkbox", () => {
    const handleFilter = jest.fn();
    const { getAllByRole } = render(
      <Filter filters={filters} onFilter={handleFilter} />
    );
    const allCheckboxes = getAllByRole('checkbox');
    const [firstCheckbox] = allCheckboxes;

    expect(firstCheckbox).toBeChecked();

    fireEvent.click(allCheckboxes[1]);
    fireEvent.click(allCheckboxes[2]);

    expect(firstCheckbox).not.toBeChecked();
  });

  test('onFilter function runs on every checkbox change', () => {
    const onFilterMock = jest.fn();
    const { getAllByRole } = render(
      <Filter filters={filters} onFilter={onFilterMock} />
    );
    const allCheckboxes = getAllByRole('checkbox');

    fireEvent.click(allCheckboxes[1]);

    expect(onFilterMock).toBeCalled();

    fireEvent.click(allCheckboxes[3]);

    expect(onFilterMock).toBeCalled();
  });
});
