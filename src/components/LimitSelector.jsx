const LimitSelector = ({ limit, onChange }) => {
  return (
    <div className='controls'>
      <label htmlFor={limit}>Show: </label>
      <select value={limit} onChange={(e) => onChange(e.target.value)}>
        <option value='5'>5</option>
        <option value='15'>15</option>
        <option value='30'>30</option>
        <option value='60'>60</option>
        <option value='100'>100</option>
      </select>
    </div>
  );
};

export default LimitSelector;
