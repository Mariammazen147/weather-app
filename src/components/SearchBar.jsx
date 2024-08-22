import React, { useState, useCallback, useRef, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const timeOutRef = useRef()

  // Debounce function
const debounce = (func, delay) => {
  return (...args) => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    timeOutRef.current = setTimeout(() => func(...args), delay);
  };
};


  const fetchSuggestions = useCallback(async (value) => {
    if (value.trim() && value.length > 2) {
      try {
  const apiKey = process.env.REACT_APP_API_KEY;

        const response = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${value}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  }, []);

  // Debounced version of fetchSuggestions
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 3000),
    [fetchSuggestions]
  );

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFetchSuggestions(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.name);
    onSearch(suggestion.name);
    setSuggestions([]);
  };

  useEffect(()=>{
    return ()=>{
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      console.log('unmounted!!!');
    }
  },[])

  return (
    <form className="input-group" onSubmit={handleFormSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter city"
          className="form-control"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="btn btn-light" type="submit">
          <i className="bi bi-search" aria-hidden="true"></i>
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
