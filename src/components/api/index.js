const url = 'http://covid19.mathdro.id/api';

export const fetchData = async () => {
  const data = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });

  const { confirmed, recovered, deaths, lastUpdate } = data;
  const modifiedData = {
    confirmed,
    recovered,
    deaths,
    lastUpdate,
  };
  return modifiedData;
};
