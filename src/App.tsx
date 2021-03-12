import React, { useState, useEffect } from "react";

import {
  Container,
  Grid,
  LeftColumn,
  RightColumn,
  ErrorMessage,
} from "./App.styles";

import GlobalStyle from "./globalStyle";
import Logo from "./components/Logo/Logo";
import Filter from "./components/Filter/Filter";
import Switcher from "./components/Tabs/Tabs";
import TicketList from "./components/TicketList/TicketList";
import { getTickets } from "./api";
import { sortingFunctions, filterFunctions } from "./utils";
import { StatusType, FilterType, Ticket, SortType } from "./types";
import Skeleton from "./components/Skeleton/Skeleton";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [status, setStatus] = useState<StatusType>("loading");

  const [sortBy, setSortBy] = useState<SortType>("price");
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

  const handleSort = sortingFunctions[sortBy];

  const handleFilter = (item: Ticket) => {
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

  const renderSkeletonTickets = () => {
    const skeletonTickets = Array.from({ length: 5 });

    return skeletonTickets.map((_ticket, index) => <Skeleton key={index} />);
  };

  const renderTicketList = () => {
    switch (status) {
      case "idle":
        return renderSkeletonTickets();
      case "loading":
        return renderSkeletonTickets();
      case "resolved":
        return (
          <>
            <TicketList
              tickets={tickets.filter(handleFilter).sort(handleSort)}
            />
          </>
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
