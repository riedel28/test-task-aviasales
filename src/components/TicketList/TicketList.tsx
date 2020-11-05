import React from "react";

import Ticket from "../Ticket/Ticket";

type Props = {
  tickets: Array<any>;
};

export default function TicketLis({ tickets }: Props) {
  return (
    <div>
      {tickets.map((ticket: any) => (
        <Ticket key={ticket.price + 222} ticket={ticket} />
      ))}
    </div>
  );
}
