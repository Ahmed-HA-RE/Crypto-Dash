import { useState, useEffect } from 'react';
import axios from 'axios';
import CoinCards from './components/CoindCard';
import LimitSelector from './components/LimitSelector';
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
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
  }, [limit]);

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className='error'>{error}</div>}

      <LimitSelector limit={limit} onChange={setLimit} />

      {!loading || !error ? (
        <main className='grid'>
          {coins.map((coin) => {
            return <CoinCards coin={coin} key={coin.id} />;
          })}
        </main>
      ) : (
        'null'
      )}
    </div>
  );
};

export default App;
