import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
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
        console.log(data);
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

  return <div>Coin Id: {id}</div>;
};

export default CoinDetails;
