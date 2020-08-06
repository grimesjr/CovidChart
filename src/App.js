import React, { useEffect, useState } from 'react';
import { fetchDataApi } from './api';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';

function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  useEffect(() => {
    fetchDataApi(country).then((retrievedData) => {
      setData({ data: retrievedData });
    });
  }, [country]);

  async function handleCountryChange(selectedCountry) {
    if (selectedCountry === 'global') {
      setCountry('');
    } else {
      setCountry(selectedCountry);
    }
  }

  if (Object.keys(data).length === 0) return 'Loading';
  return (
    <div className={styles.container}>
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
