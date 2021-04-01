import React, { useState } from 'react';
import moment, { now, updateLocale } from 'moment';

const weatherAPI = {
  key: "8df346d4834424c3f0d161607ab61f61",
  base: "http://api.openweathermap.org/data/2.5/"
}

// if possible, implementing a ticking clock could look more appealing than a static one
function dates() {
  return (moment().format('MMMM Do YYYY'));
}

function times() {
  return (moment().format('LT'));
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${weatherAPI.base}weather?q=${query}&units=metric&APPID=${weatherAPI.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  // RESTCountries API call
  // fetch(`https://restcountries.eu/rest/v2/name/${weather.sys.country}`)
  //   .then(countryRes => {
  //     countryRes.json();
  //     console.log(countryRes);
  //   });

  return (
      <div className={
        (typeof weather.main != "undefined") 
          ? ((weather.main.temp >= 20)
            ? 'app hot'
            : 'app cold')
            : 'app'
      }>
          <main>
              <div className="search-box">
                <input
                  className="search-bar"
                  placeholder="Search for City...   (not all cities are supported)"
                  onChange={e => setQuery(e.target.value)}
                  value={query}
                  onKeyPress={search}
                />             
              </div>

              {(typeof weather.main != "undefined") ? (
              <div>

                <div className="flag-box">  {/*flag can go here*/} </div>
                <div className="flag"> </div>

                <div className="location-box">
                  <div className="location">{weather.name}, {weather.sys.country}</div>
                  <div className="coords">Latitude: {weather.coord.lon} Longitude: {weather.coord.lat}</div>
                  <div className="date">{dates()}</div>
                </div>
                <div className="weather-box">
                  <div className="temp">{Math.round(weather.main.temp)}°C</div>
                  <div id="feels_like">Real Feel® {weather.main.feels_like}°C</div>
                  <div className="weather">Weather: {weather.weather[0].main}</div>
                  <br></br>
                  <div className="time">{times()}</div>
                </div>
              </div>
              ) : ('')}
          </main>
      </div>
    );
}

export default App;