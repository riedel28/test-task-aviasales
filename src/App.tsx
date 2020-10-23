import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GlobalStyle from "./globalStyle";
import Logo from "./components/Logo/Logo";
import Filter from "./components/Filter/Filter";
import Switcher from "./components/Tabs/Tabs";
import TicketList from "./components/TicketList/TicketList";
import { getTickets } from "./api";

import { FilterType } from "./types";

const Container = styled.div`
  margin: 0 auto;
  width: 754px;
  padding: 50px 0;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftColumn = styled.div`
  width: 232px;
`;

const RightColumn = styled.div`
  width: 502px;
`;

function App() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [sortBy, setSortBy] = useState("price");
  const [filters, setFilter] = useState<Array<FilterType>>([
    "all",
    "no-stops",
    "1 stop",
    "2 stops",
    "3 stops",
  ]);

  useEffect(() => {
    const fetchTickets = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const tickets = await getTickets();

        setTickets(tickets);
      } catch (err) {
        setError(err);
      }

      setIsLoading(false);
    };

    fetchTickets();
  }, []);

  const sortByPrice = (a: any, b: any) => {
    return a.price - b.price;
  };

  const sortByTime = (a: any, b: any) => {
    const totalFlightTime1 = a.segments[0].duration + a.segments[1].duration;
    const totalFlightTime2 = b.segments[0].duration + b.segments[1].duration;

    return totalFlightTime1 - totalFlightTime2;
  };

  const handleSort = sortBy === "time" ? sortByTime : sortByPrice;

  const handleFilter = (item: any) => {
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

    // return item;
  };

  console.log(filters);

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
            {isLoading && <p>Loading...</p>}
            {error ? (
              "Ошибка. Не удалось загрузить список билетов"
            ) : (
              <TicketList
                tickets={tickets.filter(handleFilter).sort(handleSort)}
              />
            )}
          </RightColumn>
        </Grid>
      </Container>
    </>
  );
}

export default App;
