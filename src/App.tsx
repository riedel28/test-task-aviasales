import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GlobalStyle from "./globalStyle";
import Logo from "./components/Logo/Logo";
import Filter from "./components/Filter/Filter";
import Switcher from "./components/Switcher/Switcher";
import TicketList from "./components/TicketList/TicketList";
import api from "./api";

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

  useEffect(() => {
    api.get("/search").then((response) => {
      const { searchId } = response.data;
      api
        .get(`/tickets?searchId=${searchId}`)
        .then((response) => setTickets(response.data.tickets.slice(0, 5)));
    });
  }, []);

  console.log(tickets);

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
            <TicketList tickets={tickets} />
          </RightColumn>
        </Grid>
      </Container>
    </>
  );
}

export default App;
