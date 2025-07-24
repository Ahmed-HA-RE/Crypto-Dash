import { useState, useEffect } from 'react';
import axios from 'axios';
import CoinCards from './components/CoindCard';
const API_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc &per_page=10&page=1&sparkline=false';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(API_URL);
        setCoins(data);
      } catch (error) {
        const status = error.response ? error.response.status : null;
        if (status === 404 || status === 500) {
          setError(error.message);
        } else {
          setError('An error has occured');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className='error'>{error}</div>}
      {!loading || !error ? <CoinCards coins={coins} /> : 'null'}
    </div>
  );
};

export default App;
