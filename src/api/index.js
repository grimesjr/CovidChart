const url = 'http://covid19.mathdro.id/api';

export const fetchDataApi = async () => {
  const retrievedData = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });

  const { confirmed, recovered, deaths, lastUpdate } = retrievedData;
  const modifiedData = {
    confirmed,
    recovered,
    deaths,
    lastUpdate,
  };
  return modifiedData;
};

export const fetchDailyApi = async () => {
  const retrievedData = await fetch(`${url}/daily`)
    .then((res) => res.json())
    .then((data) => data);
  const modifiedData = retrievedData.map((data) => ({
    confirmed: data.confirmed.total,
    deaths: data.deaths.total,
    date: data.reportDate,
  }));
  console.log(modifiedData);
  return modifiedData;
};

export const countriesApi = async () => {
  const countries = await fetch(`${url}/countries`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));

  return countries;
};
