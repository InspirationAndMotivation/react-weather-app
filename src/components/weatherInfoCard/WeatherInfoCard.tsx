import React, { useState } from 'react';
import './WeatherInfoCard.scss';
import { CardData } from '../../types/Types';
import { Background, VictoryPie } from 'victory';
import { useSelector } from 'react-redux';
import { selectUnits } from '../../selectors';
import WeatherDescription from './WeatherDescription';

const WeatherInfoCard = (props: CardData) => {
  const { title, value, graphtype, unitsign } = props;
  const { mode } = useSelector(selectUnits);

  const isCelsius = mode === 'Celsius';

  const SunnyImageLink = './img/sun.png';
  const CloudImageLink = './img/cloud1.png';
  const CloudyImageLink1 = './img/clouds2.png';
  const CloudyImageLink2 = './img/clouds3.png';

  const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const getBackgroundImage = () => {
    if (value >= 8000) return SunnyImageLink;
    else if (value <= 7999 && value >= 2000) return CloudImageLink;
    else if (value <= 1999 && value >= 1000) return CloudyImageLink1;
    else if (value <= 999) return CloudyImageLink2;
  };

  /*
   * Graph that has a half-circle shape with sections
   */
  const MultiProgressBar = () => {
    const HEIGHT = 270;
    const WIDTH = 270;

    const [sections] = useState<
      [
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number }
      ]
    >([
      { x: 0, y: 3 },
      { x: 100, y: 3 },
      { x: 200, y: 3 },
      { x: 400, y: 3 },
      { x: 600, y: 3 },
      { x: 800, y: 3 },
      { x: 1000, y: 3 },
      { x: 1200, y: 3 },
      { x: 1400, y: 3 },
      { x: 1600, y: 0 },
    ]);

    const getColor = (data: number) => {
      if (data < value) return '#5e9ce5';
      else return '#DCDCDC';
    };

    return (
      <div className="Speedometer">
        <svg>
          <VictoryPie
            animate={{
              duration: 3000,
              onLoad: { duration: 1000 },
            }}
            data={sections}
            labelPosition={'startAngle'}
            labels={({ datum }) => Math.round(datum.x)}
            height={HEIGHT}
            width={WIDTH}
            standalone={false}
            padAngle={3}
            innerRadius={WIDTH / 2 - 35}
            labelRadius={WIDTH / 2 - 20}
            startAngle={-90}
            endAngle={90}
            cornerRadius={15}
            style={{
              data: {
                fill: ({ datum }) => getColor(datum.x),
              },
            }}
          ></VictoryPie>
        </svg>
        <div className="BarTitle">
          <h1 className="LabelWithCircleBar">{`${value}${unitsign}`}</h1>
        </div>
      </div>
    );
  };

  /*
   * Graph that has three sections
   */
  const TripleProgressBar = () => {
    const HEIGHT = 270;
    const WIDTH = 270;

    const [sections] = useState<
      [
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number }
      ]
    >([
      { x: 0, y: 3 },
      { x: 35, y: 3 },
      { x: 70, y: 3 },
      { x: 100, y: 0 },
    ]);

    const getColor = (data: number) => {
      if (data < value) return '#5e9ce5';
      else return '#DCDCDC';
    };

    return (
      <div className="TripleProgressBar">
        <svg>
          <VictoryPie
            animate={{
              duration: 3000,
              onLoad: { duration: 1000 },
            }}
            data={sections}
            labelPosition={'startAngle'}
            labels={({ datum }) => Math.round(datum.x)}
            height={HEIGHT}
            width={WIDTH}
            standalone={false}
            padAngle={4}
            innerRadius={WIDTH / 2 - 35}
            startAngle={-90}
            endAngle={90}
            cornerRadius={15}
            style={{
              data: {
                fill: ({ datum }) => getColor(datum.x),
              },
            }}
          ></VictoryPie>
        </svg>
        <div className="BarTitle">
          <h1 className="LabelWithCircleBar">{`${value}${unitsign}`}</h1>
        </div>
      </div>
    );
  };

  /*
   * Graph that has a half-circle shape with sections
   */
  const Speedometer = () => {
    const HEIGHT = 270;
    const WIDTH = 270;

    const [sections] = useState<
      [
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number },
        { x: number; y: number }
      ]
    >([
      { x: 0, y: 3 },
      { x: 10, y: 3 },
      { x: 20, y: 3 },
      { x: 30, y: 3 },
      { x: 40, y: 3 },
      { x: 50, y: 0 },
    ]);

    const getColor = (data: number) => {
      if (data < value) return '#5e9ce5';
      else return '#DCDCDC';
    };

    return (
      <div className="Speedometer">
        <svg>
          <VictoryPie
            animate={{
              duration: 3000,
              onLoad: { duration: 1000 },
            }}
            data={sections}
            labelPosition={'startAngle'}
            labels={({ datum }) => Math.round(datum.x)}
            height={HEIGHT}
            width={WIDTH}
            standalone={false}
            padAngle={3}
            innerRadius={WIDTH / 2 - 35}
            labelRadius={WIDTH / 2 - 20}
            startAngle={-90}
            endAngle={90}
            cornerRadius={15}
            style={{
              data: {
                fill: ({ datum }) => getColor(datum.x),
              },
            }}
          ></VictoryPie>
        </svg>
        <div className="BarTitle">
          <h1 className="LabelWithCircleBar">{`${value}${unitsign}`}</h1>
        </div>
      </div>
    );
  };

  /*
   * Graph that has common reactangle shape
   */
  const Thermometer = () => {
    const celsiusScale = ['-50', '-25', '0', '+25', '+50'];
    const fahrenheitScale = ['-60', '-15', '32', '75', '135'];

    return (
      <div className="ProgressBar">
        <div className="BarTitle">
          <h1>{`${Math.round(
            isCelsius ? value - 273 : 1.8 * (value - 273.15) + 32
          )}${unitsign}`}</h1>
        </div>
        <div className="BarScale">
          {(isCelsius ? celsiusScale : fahrenheitScale).map((item: string) => (
            <p key={uid()}>{item}</p>
          ))}
        </div>
        <div className="Bar">
          <div
            className="BarFill"
            style={{
              width: `${
                isCelsius
                  ? 0.99 * (value - 273) + 48.5 // formulas for converting scale from Kelvins by API to Celsius using Equation of a Line from Two Points
                  : 0.57 * (1.8 * (value - 273.15) + 32) + 35 // formulas for converting scale from Kelvins by API to Fahrenheit, using Equation of a Line from Two Points
              }%`,
            }}
          ></div>
        </div>
      </div>
    );
  };

  /*
   * Graph that has common reactangle shape and progress information
   */
  const Progressbar = () => {
    const percentsScale = ['0%', '25%', '50%', '75%', '100%'];

    return (
      <div className="ProgressBar">
        <div className="BarTitle">
          <h1>{`${value}${unitsign}`}</h1>
        </div>
        <div className="BarScale">
          {percentsScale.map((item: string) => (
            <p key={uid()}>{item}</p>
          ))}
        </div>
        <div className="Bar">
          <div className="BarFill" style={{ width: `${value}%` }}></div>
        </div>
      </div>
    );
  };

  /*
   * Graph made of images on the background
   */
  const ImagesBar = () => {
    return (
      <div
        className="ImagesBar"
        style={{ backgroundImage: 'url(' + getBackgroundImage() + ')' }}
      >
        <div className="BarTitle">
          <h1>{`${value}${unitsign}`}</h1>
        </div>
      </div>
    );
  };

  return (
    <div className="WeatherInfoCard">
      <div className="Header">
        <h3>{title}</h3>
        <img src={`./img/${title.toLowerCase()}.png`} alt={title}></img>
      </div>
      <div className="Graph">
        {graphtype === 'triple' && <TripleProgressBar></TripleProgressBar>}
        {graphtype === 'speedometer' && <Speedometer></Speedometer>}
        {graphtype === 'images' && <ImagesBar></ImagesBar>}
        {graphtype === 'multi' && <MultiProgressBar></MultiProgressBar>}
        {graphtype === 'progressbar' && <Progressbar></Progressbar>}
        {graphtype === 'thermometer' && <Thermometer></Thermometer>}
        <WeatherDescription descriptionType={title} value={value} />
      </div>
    </div>
  );
};

export default WeatherInfoCard;
