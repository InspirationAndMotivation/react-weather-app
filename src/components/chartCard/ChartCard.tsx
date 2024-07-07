import React from 'react';
import './ChartCard.scss';
import { XYPlot, LineSeries } from 'react-vis';

const ChartCard = () => {
  return (
    <div className="ChartCard">
      <p>Upcoming hours</p>
      <XYPlot height={300} width={300} />
    </div>
  );
};

export default ChartCard;
