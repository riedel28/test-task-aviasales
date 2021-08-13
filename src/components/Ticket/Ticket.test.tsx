import React from 'react';
import { render, screen } from '@testing-library/react';
import { Ticket as TicketType } from '../../types';
import Ticket from './Ticket';

describe('Ticket', () => {
  test('should render Ticket correctly', () => {
    const mockTicket: TicketType = {
      price: 18645,
      carrier: 'S7',
      segments: [
        {
          date: '2021-03-27T16:25:00.000Z',
          destination: 'HKT',
          duration: 1661,
          origin: 'MOW',
          stops: ['BKK', 'SHA']
        },
        {
          date: '2021-04-16T06:41:00.000Z',
          destination: 'MOW',
          duration: 678,
          origin: 'HKT',
          stops: ['IST']
        }
      ]
    };

    render(<Ticket ticket={mockTicket} />);

    expect(screen.getByText(/18 645 Р/g)).toBeInTheDocument();
    expect(screen.getByText(/MOW - HKT/g)).toBeInTheDocument();
    expect(screen.getByText(/2 пересадки/g)).toBeInTheDocument();
    expect(screen.getByText(/1 пересадка/g)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      `//pics.avs.io/99/36/${mockTicket.carrier}.png`
    );
  });
});
