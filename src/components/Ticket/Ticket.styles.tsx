import styled from 'styled-components';

import * as colors from '../../styles/colors';

export const TicketWrapper = styled.div`
  display: flex;
  padding: 0 20px;

  background: ${colors.base};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  min-height: 184px;
  margin-bottom: 20px;
`;

export const CarrierLogo = styled.img`
  margin-bottom: 20px;
  margin-top: 20px;
  display: block;
  width: 110px;
  height: 36px;
`;

export const LeftColumn = styled.div`
  flex: 1;
`;

export const Price = styled.p`
  font-family: Open Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 36px;
  vertical-align: middle;

  letter-spacing: 0px;
  text-align: left;

  color: ${colors.blue};
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  font-family: Open Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  vertical-align: middle;
  letter-spacing: 0.5px;
  text-align: left;
  color: ${colors.middlegrey};
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0;
`;

export const Info = styled.p`
  font-family: Open Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  vertical-align: middle;
  letter-spacing: 0px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 0;
  min-height: 36px;
`;

export const MiddleColumn = styled.div`
  flex: 1;
  padding-top: 76px;
`;

export const RightColumn = styled.div`
  flex: 1;
`;
