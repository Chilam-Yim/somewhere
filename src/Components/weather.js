import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

function Weather(props) {
  const { searchCity, randomCity } = props.place;
  const [propsPlace, setPropsPlace] = useState(null);
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [icon, setIcon] = useState(null);
  const [localTime, setLocalTime] = useState(new Date());
  const [apiTimeZone, setApiTimeZone] = useState("");
  const [apiDt, setApiDt] = useState("");

  useEffect(() => {
    let place = "";
    if (searchCity === "") {
      place = randomCity;
    } else {
      place = searchCity;
    }
    setPropsPlace(place);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=813b0900367564e141f3ac45e554b5a6`
    )
      .then((data) => data.json())
      .then((data) => {
        setTemp(Math.round((data.main.temp - 273.15) * 100) / 100);
        setHumidity(data.main.humidity);
        const sunRiseTime = new Date(data.sys.sunrise * 1000);
        setSunrise(sunRiseTime.toLocaleTimeString());
        const sunSetTime = new Date(data.sys.sunset * 1000);
        setSunset(sunSetTime.toLocaleTimeString());
        setIcon(data.weather?.[0]?.icon);
        setApiTimeZone(data.timezone);
        setApiDt(data.dt);
      });
  }, [searchCity, randomCity]);

useEffect(() => {
  const interval = setInterval(() => {
    const currentTime = new Date();
    const localTimestamp =
      currentTime.getTime() +
      apiTimeZone * 1000 +
      currentTime.getTimezoneOffset() * 60 * 1000;
    setLocalTime(new Date(localTimestamp));
  }, 1000);

  return () => clearInterval(interval);
}, [apiTimeZone]);

  return (
    <div className="weatherContainer">
      <span>
        {" "}
        <Clock value={localTime} />
      </span>

      <span>
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt="Weather Icon"
        />
        <div>{temp} °C</div>
      </span>
    </div>
  );
}

export default Weather;
