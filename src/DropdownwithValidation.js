import React, { useState } from 'react';

const DropdownWithValidation = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState('');

  const countryList = [
    { id: 1, country: "India" },
    { id: 2, country: "USA" },
    { id: 3, country: "UK" }
  ];

  const cityList = [
    { id: 1, city: ["Mumbai", "Delhi", "Bangalore"] },
    { id: 2, city: ["New York", "Los Angeles", "Chicago"] },
    { id: 3, city: ["London", "Manchester", "Liverpool"] }
  ];

  const handleCountryChange = (e) => {
    const id = parseInt(e.target.value);
    setSelectedCountry(id);
    const found = cityList.find(item => item.id === id);
    setCities(found ? found.city : []);
    setSelectedCity('');
    setError('');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCountry) {
      setError('Please select country');
    } else if(!selectedCity){
        setError('Please select city!');
    }
    else {
      // reset form if needed
      setSelectedCountry('');
      setSelectedCity('');
      setCities([]);
      setError('');
    }
  };

  const selectedCountryName = countryList.find(
    country => country.id === parseInt(selectedCountry)
)?.country;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <select onChange={handleCountryChange} value={selectedCountry}>
          <option value="">-- Select Country --</option>
          {countryList.map((c) => (
            <option key={c.id} value={c.id}>{c.country}</option>
          ))}
        </select>
      </div>

      <div>
        <select onChange={handleCityChange} value={selectedCity}>
          <option value="">-- Select City --</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>

      

      <button type="submit" className='btn-primary'>Submit</button>

      {error && <div style={{ marginLeft: '10px', color: 'red' }}>{error}</div> }

      {/* Display selected city and country */}
      {selectedCountry && selectedCity && (
            <div style={{ marginLeft: '10px' }}>
            <strong>Selected:</strong> {selectedCity}, {selectedCountryName}
            </div>
        )}
    </form>
  );
};

export default DropdownWithValidation;
