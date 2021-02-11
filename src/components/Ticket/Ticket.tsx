import React from "react";
import { Ticket as TicketType } from "../../types";

import {
  TicketWrapper,
  LeftColumn,
  MiddleColumn,
  RightColumn,
  Price,
  InfoWrapper,
  Info,
  Subtitle,
  CarrierLogo,
} from "./Ticket.styles";
import {
  formatFlightTime,
  formatTime,
  getTicketFlights,
  getTicketPrice,
} from "../../utils";

type Props = {
  ticket: TicketType;
};

function Ticket({ ticket }: Props) {
  const price = getTicketPrice(ticket);
  const [toFlight, fromFlight] = getTicketFlights(ticket);

  return (
    <TicketWrapper>
      <LeftColumn>
        <Price>{price.toLocaleString("ru-RU")} Р</Price>
        <InfoWrapper>
          <Subtitle>
            {toFlight.origin} - {toFlight.destination}
          </Subtitle>
          <Info>{formatTime(toFlight.date, toFlight.duration)}</Info>
        </InfoWrapper>
        <InfoWrapper>
          <Subtitle>
            {fromFlight.origin} - {fromFlight.destination}
          </Subtitle>
          <Info>{formatTime(fromFlight.date, fromFlight.duration)}</Info>
        </InfoWrapper>
      </LeftColumn>

      <MiddleColumn>
        <InfoWrapper>
          <Subtitle>В пути</Subtitle>
          <Info>{formatFlightTime(toFlight.duration)}</Info>
        </InfoWrapper>
        <InfoWrapper>
          <Subtitle>В пути</Subtitle>
          <Info>{formatFlightTime(fromFlight.duration)}</Info>
        </InfoWrapper>
      </MiddleColumn>
      <RightColumn>
        <CarrierLogo src={`//pics.avs.io/99/36/${ticket.carrier}.png`} />
        <InfoWrapper>
          {toFlight.stops.length > 0 ? (
            <>
              <Subtitle>{toFlight.stops.length} пересадки</Subtitle>
              <Info>{toFlight.stops.join(", ")}</Info>
            </>
          ) : (
            <>
              <Subtitle>Без пересадок</Subtitle>
              <Info>&nbsp;</Info>
            </>
          )}
        </InfoWrapper>
        <InfoWrapper>
          {fromFlight.stops.length > 0 ? (
            <>
              <Subtitle>{fromFlight.stops.length} пересадки</Subtitle>
              <Info>{fromFlight.stops.join(", ")}</Info>
            </>
          ) : (
            <>
              <Subtitle>Без пересадок</Subtitle>
              <Info>&nbsp;</Info>
            </>
          )}
        </InfoWrapper>
      </RightColumn>
    </TicketWrapper>
  );
}

export default Ticket;
