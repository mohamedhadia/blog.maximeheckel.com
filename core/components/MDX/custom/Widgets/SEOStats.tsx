import styled from '@emotion/styled';
import LineChart from '@theme/components/Charts/LineChart';
import { ParentSize } from '@visx/responsive';
import React from 'react';

const Wrapper = styled('div')`
  padding: 20px;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  alignitems: center;
`;

const Chart = () => {
  const data = [
    { x: 1601942400000, y: 1141 },
    { x: 1601424000000, y: 1078 },
    { x: 1600905600000, y: 871 },
    { x: 1600387200000, y: 583 },
    { x: 1599868800000, y: 746 },
    { x: 1599350400000, y: 990 },
    { x: 1598832000000, y: 904 },
    { x: 1598313600000, y: 702 },
    { x: 1597795200000, y: 525 },
    { x: 1597276800000, y: 552 },
    { x: 1596758400000, y: 345 },
    { x: 1596240000000, y: 329 },
    { x: 1595721600000, y: 494 },
    { x: 1595203200000, y: 542 },
    { x: 1594684800000, y: 420 },
    { x: 1594166400000, y: 444 },
    { x: 1593648000000, y: 321 },
    { x: 1593129600000, y: 179 },
    { x: 1592611200000, y: 179 },
    { x: 1592092800000, y: 309 },
    { x: 1591574400000, y: 364 },
    { x: 1591056000000, y: 282 },
    { x: 1590537600000, y: 245 },
    { x: 1590019200000, y: 169 },
    { x: 1589500800000, y: 145 },
    { x: 1588982400000, y: 136 },
    { x: 1588464000000, y: 177 },
    { x: 1587945600000, y: 155 },
    { x: 1587427200000, y: 141 },
    { x: 1586908800000, y: 177 },
    { x: 1586390400000, y: 118 },
    { x: 1585872000000, y: 47 },
    { x: 1585353600000, y: 92 },
    { x: 1584835200000, y: 118 },
    { x: 1584316800000, y: 88 },
    { x: 1583798400000, y: 105 },
    { x: 1583280000000, y: 74 },
    { x: 1582761600000, y: 37 },
    { x: 1582243200000, y: 17 },
    { x: 1581724800000, y: 23 },
    { x: 1581206400000, y: 59 },
    { x: 1580688000000, y: 44 },
    { x: 1580169600000, y: 43 },
    { x: 1579651200000, y: 52 },
    { x: 1579132800000, y: 51 },
    { x: 1578614400000, y: 16 },
    { x: 1578096000000, y: 15 },
    { x: 1577577600000, y: 28 },
    { x: 1577059200000, y: 30 },
    { x: 1576540800000, y: 44 },
    { x: 1576022400000, y: 20 },
    { x: 1575504000000, y: 21 },
    { x: 1574985600000, y: 6 },
    { x: 1574467200000, y: 19 },
    { x: 1573948800000, y: 42 },
    { x: 1573430400000, y: 34 },
    { x: 1572912000000, y: 29 },
    { x: 1572393600000, y: 49 },
    { x: 1571875200000, y: 56 },
    { x: 1571356800000, y: 11 },
    { x: 1570838400000, y: 4 },
    { x: 1570320000000, y: 18 },
    { x: 1569801600000, y: 31 },
    { x: 1569283200000, y: 10 },
    { x: 1568764800000, y: 4 },
    { x: 1568246400000, y: 1 },
    { x: 1567728000000, y: 5 },
    { x: 1567209600000, y: 11 },
    { x: 1566691200000, y: 11 },
    { x: 1566172800000, y: 0 },
  ].reverse();

  return (
    <Wrapper>
      <ParentSize>
        {({ width, height }) => (
          <LineChart
            data={data}
            width={width}
            height={height}
            unit="impressions"
          />
        )}
      </ParentSize>
    </Wrapper>
  );
};

export default Chart;
