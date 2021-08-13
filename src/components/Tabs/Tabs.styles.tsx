import styled from 'styled-components';

import * as colors from '../../styles/colors';

export const TabsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

type ButtonProps = {
  left?: boolean;
  right?: boolean;
  active?: boolean;
};

export const Button = styled.button`
  background: ${(props: ButtonProps) =>
    props.active ? colors.blue : colors.base};
  color: ${(props: ButtonProps) => (props.active ? colors.base : colors.grey)};
  border: 1px solid ${colors.lightgrey};
  flex: 1;
  padding: 15px;

  font-family: Open Sans, sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-align: center;

  border-left: ${(props: ButtonProps) => (props.right ? 'none' : '0')};
  border-radius: ${(props: ButtonProps) =>
    props.left ? '0 5px 5px 0' : '5px 0 0 5px'};
  cursor: pointer;
  outline: none;
`;
