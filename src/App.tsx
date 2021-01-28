import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  LeftColumn,
  RightColumn,
  Loading,
  ErrorMessage,
} from "./App.styles";

import GlobalStyle from "./globalStyle";
import Logo from "./components/Logo/Logo";
import Filter from "./components/Filter/Filter";
import Switcher from "./components/Tabs/Tabs";
import TicketList from "./components/TicketList/TicketList";
import { getTickets } from "./api";

import { StatusType, FilterType, Ticket } from "./types";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [status, setStatus] = useState<StatusType>("idle");

  const [sortBy, setSortBy] = useState("price");
  const [filters, setFilter] = useState<FilterType[]>([
    "all",
    "no-stops",
    "1 stop",
    "2 stops",
    "3 stops",
  ]);

  useEffect(() => {
    const fetchTickets = async () => {
      setError(null);
      setStatus("loading");

      try {
        const tickets = await getTickets();

        setTickets(tickets);
        setStatus("resolved");
      } catch (err) {
        setError(err);
        setStatus("rejected");
      }
    };

    fetchTickets();
  }, []);

  const sortByPrice = (a: Ticket, b: Ticket) => {
    return a.price - b.price;
  };

  const sortByTime = (a: Ticket, b: Ticket) => {
    const totalFlightTime1 = a.segments[0].duration + a.segments[1].duration;
    const totalFlightTime2 = b.segments[0].duration + b.segments[1].duration;

    return totalFlightTime1 - totalFlightTime2;
  };

  const handleSort = sortBy === "time" ? sortByTime : sortByPrice;

  const handleFilter = (item: Ticket) => {
    const getTicketByAmountOfStops = (ticket: Ticket, stops: number) => {
      const [toFlight, fromFlight] = ticket.segments;
      const toFlightStopsLength = toFlight.stops.length;
      const fromFlightStopsLength = fromFlight.stops.length;

      if (toFlightStopsLength === stops && fromFlightStopsLength === stops) {
        return ticket;
      }
    };

    const filterFunctions = {
      all: (ticket: Ticket) => ticket,
      "no-stops": (ticket: Ticket) => getTicketByAmountOfStops(ticket, 0),
      "1 stop": (ticket: Ticket) => getTicketByAmountOfStops(ticket, 1),
      "2 stops": (ticket: Ticket) => getTicketByAmountOfStops(ticket, 2),
      "3 stops": (ticket: Ticket) => getTicketByAmountOfStops(ticket, 3),
    };

    const fns = filters
      .filter((fnName) => Object.keys(filterFunctions).includes(fnName))
      .map((name) => filterFunctions[name]);

    for (const fn of fns) {
      if (fn(item)) {
        return true;
      }
    }

    return false;
  };

  const renderTicketList = () => {
    switch (status) {
      case "idle":
        return <Loading>Loading...</Loading>;
      case "loading":
        return <Loading>Loading...</Loading>;
      case "resolved":
        return (
          <TicketList tickets={tickets.filter(handleFilter).sort(handleSort)} />
        );
      case "rejected":
        return (
          <ErrorMessage>
            Ошибка. Не удалось загрузить список билетов
            <p>{error!.message}</p>
          </ErrorMessage>
        );
      default:
        throw new Error("Impossible status");
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Logo />
        <Grid>
          <LeftColumn>
            <Filter filters={filters} onFilter={setFilter} />
          </LeftColumn>
          <RightColumn>
            <Switcher onSort={setSortBy} />
            {renderTicketList()}
          </RightColumn>
        </Grid>
      </Container>
    </>
  );
}

export default App;
