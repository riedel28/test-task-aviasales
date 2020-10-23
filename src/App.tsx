import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GlobalStyle from "./globalStyle";
import Logo from "./components/Logo/Logo";
import Filter from "./components/Filter/Filter";
import Switcher from "./components/Switcher/Switcher";
import TicketList from "./components/TicketList/TicketList";
import { getTickets } from "./api";

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

  return (
    <>
      <GlobalStyle />
      <Container>
        <Logo />
        <Grid>
          <LeftColumn>
            <Filter />
          </LeftColumn>
          <RightColumn>
            <Switcher />
            {isLoading && <p>Loading...</p>}
            {error ? error : <TicketList tickets={tickets} />}
          </RightColumn>
        </Grid>
      </Container>
    </>
  );
}

export default App;
