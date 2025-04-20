import React, { useState } from 'react'

const Dropdown = () => {

    const [selectedCountry, setSelectedCountry] = useState('')
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('')

    const countryList = [
        { id: 1, country: "India" },
        { id: 2, country: "USA" },
        { id: 3, country: "UK" }
    ];

    const cityList = [
        { id: 1, city: ["Mumbai", "Delhi", "Bangalore"] },
        { id: 2, city: ["USA1", "USA2", "USA3"] },
        { id: 3, city: ["UK1", "UK2", "UK3"] }
    ];

    const handleCityState = (e) => {
        const id = parseInt(e.target.value);
        setSelectedCountry(id);
        const foundCity = cityList.find(item => item.id === id);
        setCities(foundCity ? foundCity.city : []);
        
        console.log('Selected country ID:', id);
        console.log('Cities:', foundCity?.city);
    }

    const showSelectedCityState = (e) => {
        setSelectedCity(e.target.value)
    }

    const selectedCountryName = countryList.find(
        country => country.id === parseInt(selectedCountry)
    )?.country;

  return (
    <div>
        <select onChange={handleCityState} value={selectedCountry}>
        <option value="">Please select</option>

        {countryList && countryList.map((countre, index) => (
            <option key={index} value={countre.id}>{countre.country}</option>
        ))}
        </select>

        <select onChange={showSelectedCityState}>
            <option value="">-- Select City --</option>
            {cities.map((city, index) => (
            <option key={index}>{city}</option>
            ))}
        </select>

        {/* Display selected city and country */}
        {selectedCountry && selectedCity && (
            <div style={{ marginTop: '10px' }}>
            <strong>Selected:</strong> {selectedCity}, {selectedCountryName}
            </div>
        )}

        {/* {showCityState && (
            <p>{selectedCity}, {selectedCountry}</p>
        ) 
        } */}
    </div>
  )
}

export default Dropdown