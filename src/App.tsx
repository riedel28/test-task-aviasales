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
    const toFlightStopsLength = item.segments[0].stops.length;
    const fromFlightStopsLength = item.segments[1].stops.length;

    if (filters.includes("all")) {
      return item;
    }

    if (filters.includes("no-stops")) {
      if (toFlightStopsLength === 0 && fromFlightStopsLength === 0) {
        return item;
      }
    }

    if (filters.includes("1 stop")) {
      if (toFlightStopsLength === 1 && fromFlightStopsLength === 1) {
        return item;
      }
    }

    if (filters.includes("2 stops")) {
      if (toFlightStopsLength === 2 && fromFlightStopsLength === 2) {
        return item;
      }
    }

    if (filters.includes("3 stops")) {
      if (toFlightStopsLength === 3 && fromFlightStopsLength === 3) {
        return item;
      }
    }
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
