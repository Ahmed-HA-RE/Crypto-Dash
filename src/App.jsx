import { useState, useEffect } from 'react';
import axios from 'axios';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import Header from './components/Header';
import NotFoundPage from './pages/not-found';
import CoinDetails from './pages/coin-details';
import { Route, Routes } from 'react-router';
const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(5);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('market_cap_desc');

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
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              sort={sort}
              setSort={setSort}
              limit={limit}
              setLimit={setLimit}
              error={error}
              loading={loading}
            />
          }
        />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/coin/:id' element={<CoinDetails />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
