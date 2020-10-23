import React from "react";
import styled from "styled-components";

const TicketWrapper = styled.div`
  display: flex;
  padding: 0 20px 20px;

  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  min-height: 184px;
  margin-bottom: 20px;
`;

const CarrierLogo = styled.img`
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
  const formatFlightTime = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = Math.round((hours - hours) * 60);

    return `${hours}ч ${minutes}м`;
  };

  const { price, segments } = ticket;
  const [toFlight, fromFlight] = segments;

  const formatTime = (departureDate: string, duration: number) => {
    const departureTimestamp = Date.parse(departureDate);
    const durationInMs = duration * 60 * 1000;
    const arrivalTimestamp = departureTimestamp + durationInMs;

    const formatTimeToLocalString = (timestamp: any) => {
      return new Date(timestamp).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const departureTime = formatTimeToLocalString(departureTimestamp);
    const arrivalTime = formatTimeToLocalString(arrivalTimestamp);

    return `${departureTime} - ${arrivalTime}`;
  };

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
