import React, { useEffect, useState } from 'react';
import { fetchData } from './components/api';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData().then((retrievedData) => {
      setData({ data: retrievedData });
    });
  }, []);

  return (
    <div className={styles.container}>
      <Cards data={data} />
      <CountryPicker />
      <Chart />
    </div>
  );
}

export default App;
