import { Ticket, SortType, FilterType } from "./types.d";

export const getTicketByAmountOfStops = (ticket: Ticket, stops: number) => {
  const [toFlight, fromFlight] = ticket.segments;
  const toFlightStopsLength = toFlight.stops.length;
  const fromFlightStopsLength = fromFlight.stops.length;

  if (toFlightStopsLength === stops && fromFlightStopsLength === stops) {
    return ticket;
  }
};

const getFlightDuration = (flight: any) => flight.duration;
const getTicketFlights = (ticket: Ticket) => ticket.segments;

export const getTotalFlightDuration = (ticket: Ticket) => {
  const flights = getTicketFlights(ticket);

  return flights.reduce(
    (total, flight) => total + getFlightDuration(flight),
    0
  );
};

const sortByPrice = (a: Ticket, b: Ticket) => {
  return a.price - b.price;
};

const sortByTime = (a: Ticket, b: Ticket) => {
  const totalFlightDurationA = getTotalFlightDuration(a);
  const totalFlightDurationB = getTotalFlightDuration(b);

  return totalFlightDurationA - totalFlightDurationB;
};

export const sortingFunctions: {
  [key in SortType]: (a: Ticket, b: Ticket) => number;
} = {
  price: sortByPrice,
  time: sortByTime,
};

export const filterFunctions: {
  [key in FilterType]: (ticket: Ticket) => Ticket | undefined;
} = {
  all: (ticket: Ticket) => ticket,
  "no-stops": (ticket: Ticket) => getTicketByAmountOfStops(ticket, 0),
  "1 stop": (ticket: Ticket) => getTicketByAmountOfStops(ticket, 1),
  "2 stops": (ticket: Ticket) => getTicketByAmountOfStops(ticket, 2),
  "3 stops": (ticket: Ticket) => getTicketByAmountOfStops(ticket, 3),
};
