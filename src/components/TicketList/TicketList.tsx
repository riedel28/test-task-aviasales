import React from "react";

import Ticket from "../Ticket/Ticket";
import { Ticket as TicketType } from "../../types";

type Props = {
  tickets: Array<TicketType>;
};

export default function TicketLis({ tickets }: Props) {
  return (
    <div>
      {tickets.map((ticket) => (
        <Ticket key={ticket.price + 222} ticket={ticket} />
      ))}
    </div>
  );
}
