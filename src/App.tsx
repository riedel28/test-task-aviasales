import React, { useState } from "react";
import { useQuery } from "react-query";

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
import { getSearchId, getTickets } from "./api";
import { sortingFunctions, filterFunctions } from "./utils";
import { FilterType, Ticket, SortType } from "./types";
import Skeleton from "./components/Skeleton/Skeleton";

function App() {
  const [sortBy, setSortBy] = useState<SortType>("price");
  const [filters, setFilter] = useState<FilterType[]>([
    "all",
    "no-stops",
    "1 stop",
    "2 stops",
    "3 stops",
  ]);

  const { data: searchId } = useQuery("searchId", getSearchId);
  const {
    data: tickets,
    status,
    error,
  } = useQuery<Ticket[], Error>("tickets", () => getTickets(searchId));

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
      case "success":
        return (
          <>
            <TicketList
              tickets={tickets!.filter(handleFilter).sort(handleSort)}
            />
          </>
        );
      case "error":
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
