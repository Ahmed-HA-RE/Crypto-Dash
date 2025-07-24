const FilterInput = ({ filter, onChange }) => {
  return (
    <div className='filter'>
      <input
        type='text'
        value={filter}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Filter coins by name or symbol'
      />
    </div>
  );
};

export default FilterInput;
