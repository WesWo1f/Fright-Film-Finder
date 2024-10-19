import React from 'react'

export default function SearchBar(props) {
    const { sharedValue, getSearchInput } = props;
    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };
    const handleChange = (e) => {
        getSearchInput(e.target.value);
    }
  return (
    <form className='search-box' onSubmit={handleSearchSubmit}>
    <input
      type="text"
      value={sharedValue}
      onChange={handleChange}
      placeholder="Search For Movies"
    />
    </form>
  );
}
