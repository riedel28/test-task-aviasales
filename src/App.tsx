import React from "react";
import styled from "styled-components";

import Logo from "./components/Logo/Logo";
import Filter from "./components/Filter/Filter";
import Switcher from "./components/Switcher/Switcher";
import TicketList from "./components/TicketList/TicketList";
import GlobalStyle from "./globalStyle";

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
            <TicketList />
          </RightColumn>
        </Grid>
      </Container>
    </>
  );
}

export default App;
