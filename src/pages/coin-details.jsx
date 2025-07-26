import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import Spinner from '../components/Spinner';
import axios from 'axios';
const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCoin() {
      try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        setCoin(data);
      } catch (error) {
        const status = error.response ? error.response.status : null;
        if (status === 404 || status === 500) {
          setError(error.message);
        } else {
          setError('Not Found');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCoin();
  }, [id]);

  return (
    <div className='coin-details-container'>
      <Link to={'/'}>← Go Back Home</Link>

      <h1 className='coin-details-title'>
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : 'Coin'}
      </h1>
      {loading && <Spinner color='red' />}
      {error && <p>❌ {error}</p>}

      {!loading && !error && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className='coin-details-image'
          />

          <p>{coin.description.en.split('\n')[0]}</p>

          <div className='coin-details-info'>
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current Price: AED{' '}
              {coin.market_data.current_price.aed.toLocaleString()}
            </h3>

            <h4>
              Market Cap: AED {coin.market_data.market_cap.aed.toLocaleString()}
            </h4>
            <h4>
              24h High: AED {coin.market_data.high_24h.aed.toLocaleString()}
            </h4>
            <h4>
              24h Low: AED {coin.market_data.low_24h.aed.toLocaleString()}
            </h4>
            <h4>
              24h Price Change: AED{' '}
              {coin.market_data.price_change_24h.toFixed(2)} (
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%)
            </h4>
            <h4>
              Circulating Supply:{' '}
              {coin.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{' '}
              {coin.market_data.total_supply?.toLocaleString() || 'N/A'}
            </h4>
            <h4>
              All-Time High: AED {coin.market_data.ath.aed.toLocaleString()} on{' '}
              {new Date(coin.market_data.ath_date.aed).toLocaleDateString()}
            </h4>
            <h4>
              All-Time Low: AED {coin.market_data.atl.aed.toLocaleString()} on{' '}
              {new Date(coin.market_data.atl_date.aed).toLocaleDateString()}
            </h4>
            <h4>
              Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
            </h4>
          </div>

          <div className='coin-details-links'>
            {coin.links.homepage[0] && (
              <p>
                🌐{' '}
                <a
                  href={coin.links.homepage[0]}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Website
                </a>
              </p>
            )}
            {coin.links.blockchain_site[0] && (
              <p>
                🧩{' '}
                <a
                  href={coin.links.blockchain_site[0]}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Blockchain Explorer
                </a>
              </p>
            )}

            {coin.categories &&
              coin.categories.map((categorie) => (
                <span key={categorie}>{categorie}</span>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetails;
