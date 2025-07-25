import FilterInput from '../components/FilterInput';
import LimitSelector from '../components/LimitSelector';
import SortSelector from '../components/SortSelector';
import CoinCards from '../components/CoindCard';

const HomePage = ({
  coins,
  filter,
  setFilter,
  sort,
  setSort,
  limit,
  setLimit,
  error,
  loading,
}) => {
  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sort) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'market_cap_asc':
          return a.market_cap - b.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
    });

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className='error'>{error}</div>}

      <div className='top-controls'>
        <FilterInput filter={filter} onChange={setFilter} />
        <LimitSelector limit={limit} onChange={setLimit} />
        <SortSelector sort={sort} onChange={setSort} />
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

export default HomePage;
