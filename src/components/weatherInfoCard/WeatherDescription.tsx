import React, { useEffect, useState } from 'react';
import { DescriptionData, DescriptionType } from '../../types/Types';
import './WeatherDescription.scss';
import { Tooltip } from '@mui/material';
import { title } from 'process';

const WeatherDescription = (props: DescriptionType) => {
  const { descriptionType, value } = props;

  const [dataSet, setDataSet] = useState<DescriptionData[] | undefined>([
    { name: '', desc: '', min: 0, max: 0 },
  ]);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataSet(descriptionType);
      setDataSet(data);
      const id = await getId(value);
      if (id) setId(id);
    };

    fetchData();
  }, [descriptionType, value]);

  const windDescriptions = [
    { name: 'Calm', desc: 'Smoke rises vertically.', min: 0, max: 1.99 },
    {
      name: 'Light air',
      desc: 'Direction of wind shown by smoke drift, but not wind vanes.',
      min: 2,
      max: 5.99,
    },
    {
      name: 'Light breeze',
      desc: 'Wind felt on face. Leaves rustle. Ordinary vane moved by wind.',
      min: 6,
      max: 11.99,
    },
    {
      name: 'Gentle breeze',
      desc: 'Leaves and small twigs in constant motion. Wind extends light flag.',
      min: 12,
      max: 19.99,
    },
    {
      name: 'Moderate breeze',
      desc: 'Raises dust and loose paper. Small branches are moved.',
      min: 20,
      max: 28.99,
    },
    {
      name: 'Fresh breeze',
      desc: 'Small trees with leaves begin to sway. Crested wavelets form on inland waters.',
      min: 29,
      max: 38.99,
    },
    {
      name: 'Strong breeze',
      desc: 'Large branches in motion. Whistling heard in telephone wires. Umbrellas used with difficulty.',
      min: 39,
      max: 49.99,
    },
    {
      name: 'Near gale',
      desc: 'Whole trees in motion. Inconvenience felt in walking against wind.',
      min: 50,
      max: 61.99,
    },
    {
      name: 'Gale',
      desc: 'Breaks twigs off trees. Generally impedes progress. Walking into wind almost impossible.',
      min: 62,
      max: 74.99,
    },
    {
      name: 'Strong gale',
      desc: 'Slight structural damage occurs, e.g. roofing shingles may become loose or blow off.',
      min: 75,
      max: 88.99,
    },
    {
      name: 'Storm',
      desc: 'Trees uprooted. Considerable structural damage occurs. Better stay home.',
      min: 89,
      max: 102.99,
    },
    {
      name: 'Violent storm',
      desc: 'Widespread damage.',
      min: 103,
      max: 117.99,
    },
    {
      name: 'Hurricane',
      desc: 'Rare. Severe widespread damage to vegetation and significant structural damage possible. God bless you.',
      min: 118,
      max: 135,
    },
  ];

  const humidityDescriptions = [
    {
      name: 'Poor',
      desc: 'Poor low humidity level, please, use recommendations to increase humidity at your home',
      min: 0,
      max: 25,
    },
    {
      name: 'Fair',
      desc: 'Fair low humidity level, keep monitoring',
      min: 26,
      max: 30,
    },
    {
      name: 'Healthy',
      desc: 'Perfect healthy humidity level',
      min: 31,
      max: 70,
    },
    {
      name: 'Fair',
      desc: 'Fair high humidity level, keep monitoring',
      min: 71,
      max: 80,
    },
    {
      name: 'High',
      desc: 'Poor high humidity level. Try to running a dehumidifier or open windows for an hour or two on dry days',
      min: 81,
      max: 100,
    },
  ];

  const cloudinessDescriptions = [
    {
      name: 'Sunny',
      desc: 'Sunny and clear day',
      min: 0,
      max: 6,
    },
    {
      name: 'Mostly clear',
      desc: 'Considerable clear sky',
      min: 7,
      max: 25,
    },
    {
      name: 'Mostly sunny ',
      desc: 'Considerable sunny',
      min: 26,
      max: 50,
    },
    {
      name: 'Partly sunny',
      desc: 'Considered partly sunny',
      min: 51,
      max: 69,
    },
    {
      name: 'Mostly cloudy',
      desc: 'Considerable cloudiness',
      min: 70,
      max: 87,
    },
    {
      name: 'Cloudy',
      desc: 'Sky is covered by opaque clouds',
      min: 88,
      max: 100,
    },
  ];

  const tempDescriptions = [
    {
      name: 'Frosty',
      desc: 'Very cold if you are outside in this temperature, unbearable to most',
      min: -50 + 273.15, // Celsius to Kelvin
      max: -30 + 273.15,
    },
    {
      name: 'Chilly',
      desc: 'Very cold but bearable if in lots of warm clothes',
      min: -29 + 273.15,
      max: -10 + 273.15,
    },
    {
      name: 'Cold',
      desc: 'Great for sledding and snowman building',
      min: -9 + 273.15,
      max: 5 + 273.15,
    },
    {
      name: 'Cool',
      desc: 'You should wear a jacket',
      min: 6 + 273.15,
      max: 15 + 273.15,
    },
    {
      name: 'Warm',
      desc: 'Its comfortable for outdoor activities and leisure, although prolonged exposure or physical exertion may still require hydration and sun protection',
      min: 16 + 273.15,
      max: 25 + 273.15,
    },
    {
      name: 'Hot',
      desc: 'You can have a great time on the beach and get a tan, dont forget to apply sun cream',
      min: 26 + 273.15,
      max: 35 + 273.15,
    },
    {
      name: 'Very hot',
      desc: 'You should take a shower and be hydrated',
      min: 36 + 273.15,
      max: 40 + 273.15,
    },
    {
      name: 'Extremely hot',
      desc: 'Hellish heat, you should take an ice bath',
      min: 41 + 273.15,
      max: 51 + 273.15,
    },
  ];

  const pressureDescriptions = [
    {
      name: 'Low',
      desc: 'Low atmospheric pressure, it is recommended to avoid stress and excessive physical activity',
      min: 0,
      max: 899,
    },
    {
      name: 'Medium',
      desc: 'Normal atmospheric pressure',
      min: 900,
      max: 1075,
    },
    {
      name: 'High',
      desc: 'High atmospheric pressure, it is recommended to have a proper healthy sleep, rest and be hydrated',
      min: 1076,
      max: 1500,
    },
  ];

  const visibilityDescriptions = [
    {
      name: 'Zero visibility',
      desc: 'Objects are completely obscured, this occurs during intense weather phenomena such as dense fog, heavy snowfall, or severe storms where navigation or outdoor activities become nearly impossible. Extreme caution and avoidance of travel are usually advised under such conditions.',
      min: 0,
      max: 499,
    },
    {
      name: 'Poor visibility',
      desc: 'Objects are barely visible or completely obscured, making activities such as driving or flying hazardous without appropriate precautions. This level of visibility often occurs during heavy fog, blizzards, or severe storms.',
      min: 500,
      max: 999,
    },
    {
      name: 'Fair visibility',
      desc: 'Objects may be obscured or difficult to see, impacting activities such as driving, flying, or outdoor navigation. Additional caution and slower speeds may be required to ensure safety.',
      min: 1000,
      max: 1999,
    },
    {
      name: 'Moderate visibility',
      desc: 'Objects may be somewhat obscured, especially at longer distances. While visibility is generally adequate for routine activities, some caution may be necessary, particularly in areas where visibility can fluctuate.',
      min: 2000,
      max: 4999,
    },
    {
      name: 'Good visibility',
      desc: 'Objects are easily visible, and there are no significant visibility restrictions, supporting safe driving, flying, and outdoor activities without major hindrances.',
      min: 5000,
      max: 7999,
    },
    {
      name: 'Excellent visibility',
      desc: 'Objects are easily visible from a great distance, ensuring safe and unobstructed activities such as driving, flying, or outdoor sports.',
      min: 8000,
      max: 10000,
    },
  ];

  const getDataSet = (name: string) => {
    switch (name) {
      case 'Wind':
        return windDescriptions;
      case 'Humidity':
        return humidityDescriptions;
      case 'Feels like':
        return tempDescriptions;
      case 'Cloudiness':
        return cloudinessDescriptions;
      case 'Pressure':
        return pressureDescriptions;
      case 'Visibility':
        return visibilityDescriptions;
      default:
        return [];
    }
  };

  const getId = (value: number) => {
    const isInRange = (element: DescriptionData) =>
      value >= element.min && value <= element.max;
    const resultedId = dataSet?.findIndex(isInRange);
    return resultedId !== -1 ? resultedId : null;
  };

  return (
    <div className="WeatherDescription">
      {dataSet && (
        <Tooltip
          title={<p style={{ fontSize: '14px' }}>{`${dataSet[id].desc}`}</p>}
        >
          <p className="desc">{`${dataSet[id].name}`}</p>
        </Tooltip>
      )}
    </div>
  );
};

export default WeatherDescription;
