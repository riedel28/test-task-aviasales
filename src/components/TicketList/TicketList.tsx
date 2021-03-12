import React from "react";

import Ticket from "../Ticket/Ticket";
import { ErrorMessage } from "../../App.styles";
import { Ticket as TicketType } from "../../types";

type Props = {
  tickets: Array<TicketType>;
};

export default function TicketList({ tickets }: Props) {
  return tickets.length !== 0 ? (
    <div>
      {tickets.map((ticket) => (
        <Ticket key={ticket.price + Date.now()} ticket={ticket} />
      ))}
    </div>
  ) : (
    <ErrorMessage>
      <p>По вашему запросу билетов не найдено</p>
    </ErrorMessage>
  );
}
