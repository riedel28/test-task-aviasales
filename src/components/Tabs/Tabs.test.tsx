import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tabs from './Tabs';

describe('Tabs', () => {
  test('should render correctly', () => {
    const handleSortMock = jest.fn();
    render(<Tabs onSort={handleSortMock} />);

    expect(
      screen.getByRole('button', { name: /самый дешевый/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /самый быстрый/i })
    ).toBeInTheDocument();
  });

  test('should change sort param type', () => {
    const handleSortMock = jest.fn();
    render(<Tabs onSort={handleSortMock} />);

    userEvent.click(screen.getByRole('button', { name: /самый дешевый/i }));

    expect(handleSortMock).toBeCalledWith('price');

    userEvent.click(screen.getByRole('button', { name: /самый быстрый/i }));

    expect(handleSortMock).toBeCalledWith('time');
  });
});
