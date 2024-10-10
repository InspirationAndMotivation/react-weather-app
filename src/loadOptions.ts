import type { GroupBase, OptionsOrGroups } from 'react-select';

export type OptionType = {
  value: number;
  label: string;
};

// import axios from 'axios';

// const options = {
//   method: 'GET',
//   url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
//   headers: {
//     'x-rapidapi-key': '9bad40bda9mshfdb24089665e58ep13a55djsnd07261451855',
//     'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }

// const loadOptions = (inputValue) => {
//   return fetch(
//     `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
//     geoApiOptions
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       return {
//         options: response.data.map((city) => {
//           return {
//             value: `${city.latitude} ${city.longitude}`,
//             label: `${city.name}, ${city.countryCode}`,
//           };
//         }),
//       };
//     });
// };

// Get cities from api - https://api.api-ninjas.com/v1/city?name=San Francisco

// const loadOptions = (inputValue: string) => {
//   return dispatch(fetchTodayWeatherByCity(inputValue));
//   // return fetch(
//   //   `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
//   //   geoApiOptions
//   // )
//   //   .then((response) => response.json())
//   //   .then((response) => {
//   //     return {
//   //       options: response.data.map((city) => {
//   //         return {
//   //           value: `${city.latitude} ${city.longitude}`,
//   //           label: `${city.name}, ${city.countryCode}`,
//   //         };
//   //       }),
//   //     };
//   //   });
// };

const cities = [
  'Wroclaw',
  'New York',
  'Calgary',
  'Kyiv',
  'Toronto',
  'Ottawa',
  'Dnipro',
  'Warsaw',
  'San Francisco',
];

const options: OptionType[] = [];
for (let i = 0; i < cities.length; ++i) {
  options.push({
    value: i + 1,
    label: cities[i],
  });
}

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });

export const loadOptions = async (
  search: string,
  prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
) => {
  await sleep(1000);

  let filteredOptions: OptionType[];
  if (!search) {
    filteredOptions = options;
  } else {
    const searchLower = search.toLowerCase();

    filteredOptions = options.filter(({ label }) =>
      label.toLowerCase().includes(searchLower)
    );
  }

  const hasMore = filteredOptions.length > prevOptions.length + 10;
  const slicedOptions = filteredOptions.slice(
    prevOptions.length,
    prevOptions.length + 10
  );

  return {
    options: slicedOptions,
    hasMore,
  };
};
