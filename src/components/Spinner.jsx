import { BarLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '20px auto 40px',
  width: '35%',
};

const Spinner = ({ color }) => {
  return (
    <div>
      <BarLoader
        color={color}
        cssOverride={override}
        aria-label='Loading Spinner'
      />
    </div>
  );
};

export default Spinner;
