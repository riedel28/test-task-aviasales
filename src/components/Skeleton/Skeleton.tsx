import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import * as colors from '../../styles/colors';
import {
  TicketWrapper,
  LeftColumn,
  InfoWrapper,
  MiddleColumn,
  RightColumn
} from '../Ticket/Ticket.styles';

const BigPlaceHolder = () => (
  <Skeleton
    height={30}
    width={100}
    count={1}
    style={{ marginTop: 20, marginBottom: 20 }}
  />
);

const SmallPlaceholder = () => (
  <Skeleton height={18} width={80} count={1} style={{ borderRadius: 3 }} />
);

const LoadingSkeleton = () => (
  <SkeletonTheme color={colors.lightgrey} highlightColor={colors.lightblue}>
    <TicketWrapper>
      <LeftColumn>
        <BigPlaceHolder />
        <InfoWrapper>
          <SmallPlaceholder />
          <SmallPlaceholder />
        </InfoWrapper>
        <InfoWrapper>
          <SmallPlaceholder />
          <SmallPlaceholder />
        </InfoWrapper>
      </LeftColumn>

      <MiddleColumn>
        <InfoWrapper style={{ marginTop: '-5px' }}>
          <SmallPlaceholder />
          <SmallPlaceholder />
        </InfoWrapper>
        <InfoWrapper>
          <SmallPlaceholder />
          <SmallPlaceholder />
        </InfoWrapper>
      </MiddleColumn>
      <RightColumn>
        <BigPlaceHolder />
        <InfoWrapper>
          <SmallPlaceholder />
          <SmallPlaceholder />
        </InfoWrapper>
        <InfoWrapper>
          <SmallPlaceholder />
          <SmallPlaceholder />
        </InfoWrapper>
      </RightColumn>
    </TicketWrapper>
  </SkeletonTheme>
);

export default LoadingSkeleton;
