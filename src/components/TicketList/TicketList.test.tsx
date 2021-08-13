import React from 'react';
import { render, screen } from '@testing-library/react';

import TicketList from './TicketList';
import { Props } from '../Ticket/Ticket';
import { Ticket as TicketType } from '../../types';

jest.mock(
  '../Ticket/Ticket',
  () =>
    function MockTicket({ ticket }: Props) {
      const { price, carrier } = ticket;

      return (
        <div>
          <div>{price} Р</div>
          <div>{carrier}</div>
        </div>
      );
    }
);

describe('TicketList', () => {
  const mockTickets: TicketType[] = [
    {
      carrier: 'FV',
      price: 78673,
      segments: [
        {
          origin: 'MOW',
          destination: 'HKT',
          date: '2021-03-21T06:19:00.000Z',
          stops: ['HKG', 'BKK'],
          duration: 1205
        },
        {
          origin: 'HKT',
          destination: 'MOW',
          date: '2021-04-10T13:57:00.000Z',
          stops: [],
          duration: 722
        }
      ]
    }
  ];

  test('should render correctly', () => {
    render(<TicketList tickets={mockTickets} />);

    expect(screen.getByText(/78673/i)).toBeInTheDocument();
  });
});
