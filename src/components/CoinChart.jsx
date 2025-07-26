import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Spinner from './Spinner';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import axios from 'axios';
const API_URL = import.meta.env.VITE_COIN_API_URL;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const CoinChart = ({ id }) => {
  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      const { data } = await axios.get(
        `${API_URL}/${id}/market_chart?vs_currency=aed&days=7`
      );

      const prices = data.prices.map((price) => {
        return {
          x: price[0],
          y: price[1],
        };
      });

      setChart({
        labels: prices.map((p) => p.x),
        datasets: [
          {
            label: 'Prices (AED)',
            data: prices,
            fill: true,
            fill: true,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            pointRadius: 0,
            tension: 1,
          },
        ],
      });

      setLoading(false);
    }

    fetchPrices();
  }, [id]);

  return (
    <>
      {loading && <Spinner color='red' />}
      {!loading && (
        <div className='mt-7.5 mx-auto block'>
          <Line
            width={800}
            height={400}
            data={chart}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false },
              },
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'day',
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 7,
                  },
                },
                y: {
                  ticks: {
                    callback: (value) => `$${value.toLocaleString()}`,
                  },
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default CoinChart;
