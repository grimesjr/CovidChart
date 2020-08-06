import React, { useState, useEffect } from 'react';
import { fetchDailyApi } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';
import PropTypes from 'prop-types';

const Chart = ({ data: { data }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyApi());
    };

    fetchApi();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5',
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legends: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  );

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

Chart.propTypes = {
  data: PropTypes.object.isRequired,
  country: PropTypes.string.isRequired,
};

export default Chart;
