import React from "react";
import styled from "styled-components";

import logo from "./S7 Logo.png";

const TicketWrapper = styled.div`
  padding: 0 20px 20px;

  display: flex;
  /* flex-direction: column; */

  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  /* min-height: 184px; */
  margin-bottom: 20px;
`;

const CarrierLogo = styled.div`
  background-image: url(${logo});
  margin-bottom: 20px;
  margin-top: 20px;
  display: block;
  width: 110px;
  height: 36px;
`;

const LeftColumn = styled.div`
  flex: 1;
`;

const Price = styled.p`
  font-family: Open Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  /* line-height: 24px; */
  letter-spacing: 0px;
  text-align: left;

  color: #2196f3;
  margin-top: 20px;
  margin-bottom: 26px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-family: Open Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #a0b0b9;
  text-transform: uppercase;

  margin-top: 0;
  margin-bottom: 0;
`;

const Info = styled.p`
  font-family: Open Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 0;
`;

const MiddleColumn = styled.div`
  flex: 1;
  padding-top: 78px;
`;

const RightColumn = styled.div`
  flex: 1;
`;

export default function Ticket({ ticket }: any) {
  const displayFlightTime = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = Math.round((hours - hours) * 60);

    return `${hours}ч ${minutes}м`;
  };

  return (
    <TicketWrapper>
      <LeftColumn>
        <Price>{ticket.price} Р</Price>
        <InfoWrapper>
          <Subtitle>
            {ticket.segments[0].origin} - {ticket.segments[0].destination}
          </Subtitle>
          <Info>{new Date(ticket.segments[0].date).toLocaleDateString()}</Info>
        </InfoWrapper>
        <InfoWrapper>
          <Subtitle>
            {ticket.segments[1].origin} - {ticket.segments[1].destination}
          </Subtitle>
          <Info>{ticket.segments[1].date}</Info>
        </InfoWrapper>
      </LeftColumn>

      <MiddleColumn>
        <InfoWrapper>
          <Subtitle>В пути</Subtitle>
          <Info>{displayFlightTime(ticket.segments[0].duration)}</Info>
        </InfoWrapper>
        <InfoWrapper>
          <Subtitle>В пути</Subtitle>
          <Info>{displayFlightTime(ticket.segments[1].duration)}</Info>
        </InfoWrapper>
      </MiddleColumn>
      <RightColumn>
        <CarrierLogo />
        <InfoWrapper>
          <Subtitle>{ticket.segments[0].stops.length} пересадки</Subtitle>
          <Info>{ticket.segments[0].stops.join(", ")}</Info>
        </InfoWrapper>
        <InfoWrapper>
          <Subtitle>{ticket.segments[1].stops.length} пересадка</Subtitle>
          <Info>{ticket.segments[1].stops.join(", ")}</Info>
        </InfoWrapper>
      </RightColumn>
    </TicketWrapper>
  );
}
