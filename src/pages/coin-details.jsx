import { useParams } from 'react-router';

const CoinDetails = () => {
  const { id } = useParams();
  return <div>Coin Id: {id}</div>;
};

export default CoinDetails;
