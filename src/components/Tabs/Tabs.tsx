import React, { useState, useCallback } from 'react';

import { TabsWrapper, Button } from './Tabs.styles';

type Props = {
  onSort: (param: 'price' | 'time') => void;
};

function Tabs({ onSort }: Props) {
  const [sortParam, setSortParam] = useState('price');

  const handleSortParam = useCallback(
    (param: 'price' | 'time') => {
      setSortParam(param);
      onSort(param);
    },
    [onSort]
  );

  return (
    <TabsWrapper>
      <Button
        onClick={() => handleSortParam('price')}
        right
        active={sortParam === 'price'}
      >
        Самый дешевый
      </Button>
      <Button
        onClick={() => handleSortParam('time')}
        left
        active={sortParam === 'time'}
      >
        Самый быстрый
      </Button>
    </TabsWrapper>
  );
}

export default Tabs;
