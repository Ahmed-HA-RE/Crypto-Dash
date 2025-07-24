import { useState, useEffect } from 'react';
import axios from 'axios';
import CoinCards from './components/CoindCard';
import LimitSelector from './components/LimitSelector';
import FilterInput from './components/FilterInput';
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(5);
  const [filter, setFilter] = useState('');

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

  const filteredCoins = coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className='error'>{error}</div>}

      <div className='top-controls'>
        <FilterInput filter={filter} onChange={setFilter} />
        <LimitSelector limit={limit} onChange={setLimit} />
      </div>

      {!loading || !error ? (
        <main className='grid'>
          {filteredCoins.length === 0 ? (
            <p>No Results Found</p>
          ) : (
            filteredCoins.map((coin) => {
              return <CoinCards coin={coin} key={coin.id} />;
            })
          )}
        </main>
      ) : (
        'null'
      )}
    </div>
  );
};

export default App;
