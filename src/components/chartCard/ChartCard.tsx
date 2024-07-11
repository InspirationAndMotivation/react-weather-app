import React, { useState } from 'react';
import './ChartCard.scss';
import { LineChart } from '@mui/x-charts';

/*
 * All data are mocked (because of free API restrictions) to see how it could look like
 */

const mockedWeatherData = [
  { time: 'Now', image: './img/sun-sign.svg', temp: '27°' },
  { time: '11:00', image: './img/sun-sign.svg', temp: '28°' },
  { time: '12:00', image: './img/cloud-sun-sign.svg', temp: '28°' },
  { time: '13:00', image: './img/cloud-sign.svg', temp: '29°' },
  { time: '14:00', image: './img/sun-sign.svg', temp: '30°' },
  { time: '15:00', image: './img/cloud-sun-sign.svg', temp: '35°' },
  { time: '16:00', image: './img/cloud-sun-sign.svg', temp: '27°' },
  { time: '17:00', image: './img/sun-sign.svg', temp: '23°' },
];

const ChartCard = () => {
  const [uData] = useState<number[]>([23, 29, 58, 75, 33, 20, 73, 49]);

  const xLabels = ['23%', '29%', '58%', '75%', '33%', '20%', '73%', '49%'];

  return (
    <div className="ChartCard">
      <p>Upcoming hours</p>
      <div className="WetherChartDesc">
        {mockedWeatherData.map((item) => {
          return (
            <div className="WeatherChartDescItem" key={item.time}>
              <p>{item.time}</p>
              <img src={item.image} alt="Weather Sign"></img>
              <p>{item.temp}</p>
            </div>
          );
        })}
      </div>
      <LineChart
        className="WeatherChart"
        width={1400}
        height={170}
        series={[
          {
            data: uData,
            curve: 'linear',
            area: true,
            showMark: false,
            color: '#5e9ce5',
          },
        ]}
        leftAxis={null}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </div>
  );
};

export default ChartCard;
