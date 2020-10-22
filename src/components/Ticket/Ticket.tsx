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

export default function Ticket() {
  return (
    <TicketWrapper>
      <LeftColumn>
        <Price>13 400 Р</Price>
        <InfoWrapper>
          <Subtitle>Mow - Hkt</Subtitle>
          <Info>10:45 – 08:00</Info>
        </InfoWrapper>
        <InfoWrapper>
          <Subtitle>Mow - Hkt</Subtitle>
          <Info>10:45 – 08:00</Info>
        </InfoWrapper>
      </LeftColumn>

      <MiddleColumn>
        <InfoWrapper>
          <Subtitle>В пути</Subtitle>
          <Info>21ч 15м</Info>
        </InfoWrapper>
        <InfoWrapper>
          <Subtitle>В пути</Subtitle>
          <Info>13ч 30м</Info>
        </InfoWrapper>
      </MiddleColumn>
      <RightColumn>
        <CarrierLogo />
        <InfoWrapper>
          <Subtitle>2 пересадки</Subtitle>
          <Info>HKG, JNB</Info>
        </InfoWrapper>
        <InfoWrapper>
          <Subtitle>1 пересадка</Subtitle>
          <Info>HKG</Info>
        </InfoWrapper>
      </RightColumn>
    </TicketWrapper>
  );
}
