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
  formatPrice,
  formatStops,
  getTicketFlights,
  getTicketPrice,
} from "../../utils";

export type Props = {
  ticket: TicketType;
};

function Ticket({ ticket }: Props) {
  const price = getTicketPrice(ticket);
  const [toFlight, fromFlight] = getTicketFlights(ticket);

  return (
    <TicketWrapper>
      <LeftColumn>
        <Price>{formatPrice(price)}</Price>
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
          <Info>{formatFlightTime(toFlight.duration)} &nbsp;</Info>
        </InfoWrapper>
        <InfoWrapper>
          <Subtitle>В пути</Subtitle>
          <Info>{formatFlightTime(fromFlight.duration)}</Info>
        </InfoWrapper>
      </MiddleColumn>
      <RightColumn>
        <CarrierLogo src={`//pics.avs.io/99/36/${ticket.carrier}.png`} />
        <InfoWrapper>
          <Subtitle>{formatStops(fromFlight.stops.length)}</Subtitle>
          <Info>{fromFlight.stops.join(", ")}</Info>
        </InfoWrapper>
        <InfoWrapper>
          <Subtitle>{formatStops(toFlight.stops.length)}</Subtitle>
          <Info>{toFlight.stops.join(", ")}</Info>
        </InfoWrapper>
      </RightColumn>
    </TicketWrapper>
  );
}

export default Ticket;
