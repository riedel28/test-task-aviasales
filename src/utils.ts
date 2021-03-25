import { Ticket, SortType, FilterType } from "./types.d";

export const formatFlightTime = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = Math.round((hours - hours) * 60);

  return `${hours}ч ${minutes}м`;
};

export const formatTime = (departureDate: string, duration: number) => {
  const departureTimestamp = Date.parse(departureDate);
  const durationInMs = duration * 60 * 1000;
  const arrivalTimestamp = departureTimestamp + durationInMs;

  const formatTimeToLocalString = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const departureTime = formatTimeToLocalString(departureTimestamp);
  const arrivalTime = formatTimeToLocalString(arrivalTimestamp);

  return `${departureTime} - ${arrivalTime}`;
};

export const formatPrice = (price: number) => {
  return `${price.toLocaleString("ru-RU")} Р`;
};

const declOfNum = (n: number, textForms: string[]) => {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) {
    return textForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }
  if (n1 === 1) {
    return textForms[0];
  }

  return textForms[2];
};

export const formatStops = (num: number) => {
  if (num === 0) {
    return "Без пересадок";
  }

  return `${num} ${declOfNum(num, ["пересадка", "пересадки", "пересадок"])}`;
};

export const getTicketByAmountOfStops = (ticket: Ticket, stops: number) => {
  const [toFlight, fromFlight] = ticket.segments;
  const toFlightStopsLength = toFlight.stops.length;
  const fromFlightStopsLength = fromFlight.stops.length;

  if (toFlightStopsLength === stops && fromFlightStopsLength === stops) {
    return ticket;
  }
};

export const getFlightDuration = (flight: any) => flight.duration;
export const getTicketFlights = (ticket: Ticket) => ticket.segments;
export const getTicketPrice = (ticket: Ticket) => ticket.price;

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
