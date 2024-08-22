
export const fetchWeather = async (city) => {
  const apiKey = "09189ee669c84cd1b3284012241408";
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=2`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching the weather data:", error);
    throw error;
  }
};

export const fetchCitySuggestions = async (query) => {
  console.log(query);
  console.log(query.length);

  
  if(query?.length<3){
    return
  }
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.map(item => item.name); 
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};

